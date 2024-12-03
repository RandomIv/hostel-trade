import handleAsync from '../utils/handleAsync.js';
import {
  deleteUserById,
  getUserById,
  updateUserById,
} from '../services/userService.js';
import bcrypt from 'bcrypt';

export const getUser = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const { data: user, error } = await getUserById(id);

  if (error) return next(error);

  res.status(200).json({ status: 'success', user });
});

export const updateUser = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const dataToUpdate = req.body;

  if (dataToUpdate.password) {
    dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
  }
  const { error } = await updateUserById(id, dataToUpdate);

  if (error) return next(error);

  res
    .status(200)
    .json({ status: 'success', message: 'User updated successfully' });
});

export const deleteUser = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const { error } = deleteUserById(id);

  if (error) return next(error);

  res
    .status(200)
    .json({ status: 'success', message: 'User deleted successfully' });
});
