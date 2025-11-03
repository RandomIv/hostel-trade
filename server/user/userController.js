import handleAsync from '../utils/handleAsync.js';
import { sendResponse } from '../utils/responseUtils.js';
import { toSnakeCase } from '../utils/objectUtils.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import setCurrentUserId from '../middlewares/setCurrentUserId.js';
import Router from 'express';
import { deleteUser, fetchUser, updateUser } from './userService.js';

const userController = Router();

userController.get(
  '/user/:id',
  handleAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await fetchUser(id, next);

    sendResponse(res, 200, { user });
  }),
);

userController.patch(
  '/user/:id',
  handleAsync(async (req, res, next) => {
    const { id } = req.params;
    const dataToUpdate = toSnakeCase(req.body);

    await updateUser(id, dataToUpdate, next);

    sendResponse(res, 200, null, 'User updated successfully');
  }),
);

userController.delete(
  '/user/:id',
  handleAsync(async (req, res, next) => {
    const { id } = req.params;

    await deleteUser(id, next);

    sendResponse(res, 200, null, 'User deleted successfully');
  }),
);


export default userController;
