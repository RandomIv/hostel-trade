import Router from 'express';
import { register, login, logout, refresh } from '../controllers/userController.js';
import handleAsync from '../middlewares/handleAsync.js';

const userRouter = Router();

userRouter.post('/signup', handleAsync(register));
userRouter.post('/login', handleAsync(login));
userRouter.get('/logout', handleAsync(logout));
userRouter.post('/refresh', handleAsync(refresh));

export default userRouter;
