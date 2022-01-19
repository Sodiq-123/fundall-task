import express, { Router } from 'express';
import UserController from 'src/controllers/users.controllers';
import validate from 'src/shared/validations/user.validate';

const router = express.Router();

router.post('/register', [validate.signUp], UserController.createAccount);
router.post('/login', [validate.login], UserController.login);

const userRoutes: Router = router;
export default userRoutes;
