import Router from 'express';
import {
  register,
  login,
  logout,
  refresh,
} from '../controllers/authController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const authRouter = Router();

authRouter.post('/signup', register);
authRouter.post('/login', login);
authRouter.get('/logout', logout);
authRouter.get('/refresh', refresh);
authRouter.get('/protect', authenticateToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default authRouter;
