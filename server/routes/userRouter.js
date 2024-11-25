import Router from 'express';
import { register, login, logout} from '../controllers/userController.js';

const userRouter = Router();

userRouter.post('/signup', register);
userRouter.post('/login', login);
userRouter.get('/logout', logout);

export default userRouter;
