import handleAsync from '../utils/handleAsync.js';
import { sendResponse } from '../utils/responseUtils.js';
import {
  createType,
  deleteTypeById,
  getTypeById,
  selectTypes,
} from '../services/typeService.js';

export const getTypes = handleAsync(async (req, res, next) => {
  const { data: types, error } = await selectTypes();
  if (error) return next(error);

  sendResponse(res, 200, { types });
});

export const getType = handleAsync(async (req, res, next) => {
  const { id } = req.params;

  const { data: type, error } = await getTypeById(id);
  if (error) return next(error);

  sendResponse(res, 200, { type });
});

export const postType = handleAsync(async (req, res, next) => {
  const { name } = req.body;

  const { error } = await createType(name);
  if (error) return next(error);

  sendResponse(res, 201, null, 'Type created successfully');
});

export const deleteType = handleAsync(async (req, res, next) => {
  const { id } = req.params;

  const { error } = await deleteTypeById(id);
  if (error) return next(error);

  sendResponse(res, 200, null, 'Type deleted successfully');
});
