import Router from 'express';
import {
  signup,
  login,
  logout,
  refresh,
  protect,
  activateAccount,
} from '../controllers/authController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/logout', logout);
authRouter.get('/refresh', refresh);
authRouter.get('/activate', activateAccount);
authRouter.get('/protect', authenticateToken, protect);

export default authRouter;
