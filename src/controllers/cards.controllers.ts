import { Response } from 'express';
import CardService from 'src/services/cards.service';
import BaseReq from 'src/shared/utils/baseRequest';
import { handleFailure, handleSuccess } from 'src/shared/utils/responseHandler';

export default class CardController {
  public static async createCards(req: BaseReq, res: Response) {
    try {
      const card = await CardService.createCards(+req.user.id);
      if (!card) {
        return handleFailure(400, 'cards not created', undefined, req, res);
      }
      return handleSuccess(201, 'cards created', card, req, res);
    } catch (e) {
      return handleFailure(400, e.message, undefined, req, res);
    }
  }

  public static async requestCard(req: BaseReq, res: Response) {
    try {
      const card = await CardService.requestCard(
        +req.user.id,
        +req.params.cardId
      );
      if (!card) {
        return handleFailure(
          400,
          'card not successfully requested',
          undefined,
          req,
          res
        );
      }
      return handleSuccess(200, 'card requested', card, req, res);
    } catch (e) {
      return handleFailure(400, e.message, undefined, req, res);
    }
  }

  public static async getCardById(req: BaseReq, res: Response) {
    try {
      const card = await CardService.getCardById(+req.params.id);
      return handleSuccess(200, 'card found', card, req, res);
    } catch (e) {
      return handleFailure(404, 'card not found', undefined, req, res);
    }
  }

  public static async getAllCards(req: BaseReq, res: Response) {
    try {
      const cards = await CardService.getAllCards(+req.user.id);
      return handleSuccess(200, 'cards found', cards, req, res);
    } catch (e) {
      return handleFailure(404, e.message, undefined, req, res);
    }
  }

  public static async getBalanceByCardId(req: BaseReq, res: Response) {
    try {
      const balance = await CardService.getBalanceByCardId(+req.params.cardId);
      return handleSuccess(200, 'balance found', balance, req, res);
    } catch (e) {
      return handleFailure(404, e.message, undefined, req, res);
    }
  }

  public static async fundCard(req: BaseReq, res: Response) {
    try {
      const fund = await CardService.fundCard(
        +req.params.cardId,
        +req.body.amount
      );
      return handleSuccess(200, 'card successfully funded', fund, req, res);
    } catch (e) {
      return handleFailure(400, e.message, undefined, req, res);
    }
  }
}
