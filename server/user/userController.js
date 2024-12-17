import handleAsync from '../utils/handleAsync.js';
import { deleteUserById, getUserById, updateUserById } from './userService.js';
import bcrypt from 'bcrypt';
import { sendResponse } from '../utils/responseUtils.js';
import { toSnakeCase } from '../utils/objectUtils.js';

export const getUser = handleAsync(async (req, res, next) => {
  const { id } = req.params;

  const { data: user, error } = await getUserById(id);
  if (error) return next(error);

  sendResponse(res, 200, { user });
});

export const updateUser = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const dataToUpdate = toSnakeCase(req.body);

  if (dataToUpdate.password) {
    dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
  }

  const { error } = await updateUserById(id, dataToUpdate);
  if (error) return next(error);

  sendResponse(res, 200, null, 'User updated successfully');
});

export const deleteUser = handleAsync(async (req, res, next) => {
  const { id } = req.params;

  const { error } = deleteUserById(id);
  if (error) return next(error);

  sendResponse(res, 200, null, 'User deleted successfully');
});
