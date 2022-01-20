import { Response } from 'express';
import TransactionService from 'src/services/transactions.service';
import BaseReq from 'src/shared/utils/baseRequest';
import { handleFailure, handleSuccess } from 'src/shared/utils/responseHandler';

export default class TransactionController {
  public static async initiateTransaction(req: BaseReq, res: Response) {
    try {
      const transaction = await TransactionService.initiateTransaction(
        +req.user.id,
        +req.params.cardId,
        +req.body.amount,
        req.body.merchant,
        req.body.category
      );
      return handleSuccess(201, 'transaction initiated', transaction, req, res);
    } catch (e) {
      return handleFailure(400, e.message, undefined, req, res);
    }
  }

  public static async getTransactionById(req: BaseReq, res: Response) {
    try {
      const transaction = await TransactionService.getTransactionById(
        +req.params.transactionId
      );
      return handleSuccess(200, 'transaction found', transaction, req, res);
    } catch (e) {
      return handleFailure(404, e.message, undefined, req, res);
    }
  }

  public static async getAllTransactions(req: BaseReq, res: Response) {
    try {
      const transactions = await TransactionService.getAllTransactions(
        +req.user.id
      );
      return handleSuccess(
        200,
        'All transactions found',
        transactions,
        req,
        res
      );
    } catch (e) {
      return handleFailure(404, e.message, undefined, req, res);
    }
  }

  public static async getAllTransactionsByCardId(req: BaseReq, res: Response) {
    try {
      const transactions = await TransactionService.getAllTransactionsByCardId(
        +req.params.cardId
      );
      return handleSuccess(
        200,
        'transactions found for card',
        transactions,
        req,
        res
      );
    } catch (e) {
      return handleFailure(404, e.message, undefined, req, res);
    }
  }

  public static async getAllTransactionsByUserId(req: BaseReq, res: Response) {
    try {
      const transactions =
        await TransactionService.getAllTransactionsByUserId();
      return handleSuccess(
        200,
        'transactions found for user',
        transactions,
        req,
        res
      );
    } catch (e) {
      return handleFailure(404, e.message, undefined, req, res);
    }
  }

  public static async getAllTransactionsByDateAndCardId(
    req: BaseReq,
    res: Response
  ) {
    try {
      const transactions =
        await TransactionService.getAllTransactionsByDateAndCardId(
          +req.user.id,
          +req.params.cardId,
          req.body.startDate,
          req.body.endDate
        );
      return handleSuccess(
        200,
        'transactions found for card by Date',
        transactions,
        req,
        res
      );
    } catch (e) {
      return handleFailure(404, e.message, undefined, req, res);
    }
  }
}
