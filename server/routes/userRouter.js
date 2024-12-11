import Router from 'express';
import {
  deleteUser,
  getUser,
  updateUser,
} from '../controllers/userController.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import setCurrentUserId from '../middlewares/setCurrentUserId.js';

const userRouter = Router();

userRouter.route('/user/:id').get(getUser).patch(updateUser).delete(deleteUser);

userRouter.get('/me', authenticateToken, setCurrentUserId, getUser);

export default userRouter;
