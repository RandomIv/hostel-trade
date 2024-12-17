import Router from 'express';
import {
  signup,
  login,
  logout,
  refresh,
  protect,
  activateAccount,
  forgotPassword,
  resetPassword,
} from './authController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/logout', logout);
authRouter.get('/refresh', refresh);
authRouter.get('/activate', activateAccount);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password', resetPassword);
authRouter.get('/protect', authenticateToken, protect);

export default authRouter;
