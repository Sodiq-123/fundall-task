import express, { Router } from 'express';
import userRoutes from './users.routes';
import cardRoutes from './cards.routes';

const router = express.Router();
router.use('/user', userRoutes);
router.use('/cards', cardRoutes);

const routerBase: Router = router;
export default routerBase;
