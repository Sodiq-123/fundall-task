import Cards from 'src/models/cards.models';
import Users from 'src/models/users.models';
import BadRequestException from 'src/shared/exception/BadRequestException';

export default class CardService {
  public static async createCards(userId: number) {
    const user = await Users.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('user not found');
    }
    const cards = [
      {
        name: 'Lifestyle Pro',
        counts: 0,
        userId,
        balance: 0,
      },
      {
        name: 'Lifestyle Premium',
        counts: 0,
        userId,
        balance: 0,
      },
      {
        name: 'Lifestyle Business',
        counts: 0,
        userId,
        balance: 0,
      },
    ];
    const createdCards = await Cards.bulkCreate(cards);
    return createdCards;
  }

  public static async requestCard(userId: number, cardId: number) {
    const user = await Users.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('user not found');
    }
    const card = await Cards.findOne({ where: { id: cardId } });
    if (!card) {
      throw new BadRequestException('card not found');
    }
    card.counts += 1;
    await card.save();
    return card;
  }

  public static async getCardById(cardId: number) {
    const card = await Cards.findAll({ where: { id: cardId } });
    if (!card) {
      throw new BadRequestException('card not found');
    }
    if (card[0].counts !== 1) {
      throw new BadRequestException('You have not requested this card');
    }
    return card;
  }

  public static async getAllCards(userId: number) {
    const cards = await Cards.findAll({ where: { userId, counts: 1 } });
    if (!cards) {
      throw new BadRequestException('no cards requested yet');
    }
    return cards;
  }

  public static async getBalanceByCardId(cardId: number) {
    const card = await Cards.findOne({ where: { id: cardId } });
    if (!card) {
      throw new BadRequestException('card not found');
    }
    return card.balance;
  }

  public static async fundCard(cardId: number, amount: number) {
    const card = await Cards.findOne({ where: { id: cardId } });
    if (card.counts !== 1) {
      throw new BadRequestException('You have not requested for this card');
    }
    card.balance += amount;
    await card.save();
    return card;
  }
}
