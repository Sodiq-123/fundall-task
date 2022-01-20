import express, { Router } from 'express';
import userRoutes from './users.routes';
import cardRoutes from './cards.routes';
import transactionRoutes from './transactions.routes';

const router = express.Router();
router.use('/user', userRoutes);
router.use('/cards', cardRoutes);
router.use('/transactions', transactionRoutes);

const routerBase: Router = router;
export default routerBase;
