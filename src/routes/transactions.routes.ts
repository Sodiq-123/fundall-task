import express, { Router } from 'express';
import TransactionController from 'src/controllers/transaction.controllers';
import isAuthorized from 'src/middlewares/isAuthorized';

const router = express.Router();

router.post(
  '/initiate/:cardId',
  [isAuthorized],
  TransactionController.initiateTransaction
);
router.get(
  '/get/:transactionId',
  [isAuthorized],
  TransactionController.getTransactionById
);
router.get(
  '/get/all/:cardId',
  [isAuthorized],
  TransactionController.getAllTransactionsByCardId
);
router.get(
  '/get',
  [isAuthorized],
  TransactionController.getAllTransactionsByUserId
);
router.get(
  '/get/by-date/card/:cardId',
  [isAuthorized],
  TransactionController.getAllTransactionsByDateAndCardId
);

const transactionRoutes: Router = router;
export default transactionRoutes;
