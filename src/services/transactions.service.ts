import { Op } from 'sequelize';
import Cards from 'src/models/cards.models';
import Transactions from 'src/models/transaction.models';
import BadRequestException from 'src/shared/exception/BadRequestException';
import { v4 as uuid } from 'uuid';

export default class TransactionService {
  public static async initiateTransaction(
    userId: number,
    cardId: number,
    amount: number,
    merchant: string,
    category: string,
    transactionType = 'debit' as string,
    reference = uuid() as string
  ) {
    const card = await Cards.findOne({ where: { id: cardId } });
    if (card.counts !== 1) {
      throw new BadRequestException('You have not requested for this card');
    }
    if (card.balance < amount) {
      throw new BadRequestException('Insufficient funds');
    }
    card.balance -= amount;
    const transaction = await Transactions.create({
      userId,
      cardId,
      amount,
      transactionType,
      reference,
      merchant,
      category,
    });
    return transaction;
  }

  public static async getTransactionById(transactionId: number) {
    const transaction = await Transactions.findOne({
      where: { id: transactionId },
    });
    if (!transaction) {
      throw new BadRequestException('transaction not found');
    }
    return transaction;
  }

  public static async getAllTransactions(userId: number) {
    const transactions = await Transactions.findAll({
      where: { userId },
    });
    if (!transactions) {
      throw new BadRequestException('transactions not found');
    }
    return transactions;
  }

  public static async getAllTransactionsByCardId(cardId: number) {
    const transactions = await Transactions.findAll({
      where: { id: cardId },
    });
    if (!transactions) {
      throw new BadRequestException('transactions not found');
    }
    return transactions;
  }

  public static async getAllTransactionsByUserId() {
    const transactions = await Transactions.findAll();
    if (!transactions) {
      throw new BadRequestException('transactions not found');
    }
    return transactions;
  }

  public static async getAllTransactionsByDateAndCardId(
    userId: number,
    cardId: number,
    startDate: string,
    endDate: string
  ) {
    const transactions = await Transactions.findAll({
      where: {
        userId,
        cardId,
        createdAt: {
          [Op.in]: [startDate, endDate],
        },
      },
    });
    if (!transactions) {
      throw new BadRequestException('transactions not found');
    }
    return transactions;
  }

  public static async getAllTransactionsByUserIdAndCardId(
    userId: number,
    cardId: number
  ) {
    const transactions = await Transactions.findAll({
      where: {
        userId,
        cardId,
      },
    });
    if (!transactions) {
      throw new BadRequestException('transactions not found');
    }
    return transactions;
  }
}
