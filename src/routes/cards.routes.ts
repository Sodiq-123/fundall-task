import express, { Router } from 'express';
import CardController from 'src/controllers/cards.controllers';
import isAuthorized from 'src/middlewares/isAuthorized';

const router = express.Router();

router.post('/request/:cardId', [isAuthorized], CardController.requestCard);
router.post('/create', [isAuthorized], CardController.createCards);
router.get('/get/:id', [isAuthorized], CardController.getCardById);
router.get('/get', [isAuthorized], CardController.getAllCards);

const cardRoutes: Router = router;
export default cardRoutes;
