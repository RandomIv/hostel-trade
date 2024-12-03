import Router from 'express';
import {
  deleteUser,
  getUser,
  updateUser,
} from '../controllers/userController.js';

const userRouter = Router();

userRouter.route('/user/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default userRouter;
