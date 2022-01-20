import express, { Router } from 'express';
import CardController from 'src/controllers/cards.controllers';
import isAuthorized from 'src/middlewares/isAuthorized';

const router = express.Router();

router.post('/create', [isAuthorized], CardController.createCards);
router.post('/request/:cardId', [isAuthorized], CardController.requestCard);
router.get('/get/:id', [isAuthorized], CardController.getCardById);
router.get('/get', [isAuthorized], CardController.getAllCards);
router.get(
  '/get/balance/:cardId',
  [isAuthorized],
  CardController.getBalanceByCardId
);
router.post('/fund/:cardId', [isAuthorized], CardController.fundCard);

const cardRoutes: Router = router;
export default cardRoutes;
