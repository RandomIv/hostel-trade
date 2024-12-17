import Router from 'express';
import { deleteUser, getUser, updateUser } from './userController.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import setCurrentUserId from '../middlewares/setCurrentUserId.js';

const userRouter = Router();

userRouter.route('/user/:id').get(getUser).patch(updateUser).delete(deleteUser);

userRouter
  .route('/me')
  .get(authenticateToken, setCurrentUserId, getUser)
  .patch(authenticateToken, setCurrentUserId, updateUser);

export default userRouter;
