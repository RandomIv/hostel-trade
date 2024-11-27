import Router from 'express';
import { register, login, logout, refresh } from '../controllers/authController.js';

const userRouter = Router();

userRouter.post('/signup', register);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
userRouter.post('/refresh', refresh);

export default userRouter;
