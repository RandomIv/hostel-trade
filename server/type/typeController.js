import handleAsync from '../utils/handleAsync.js';
import { sendResponse } from '../utils/responseUtils.js';
import Router from 'express';
import { addType, fetchType, fetchTypes, removeType } from './typeService.js';

const typeController = Router();

typeController.get(
  '/type',
  handleAsync(async (req, res, next) => {
    const types = await fetchTypes(next);

    sendResponse(res, 200, { types });
  }),
);

typeController.get(
  '/type/:id',
  handleAsync(async (req, res, next) => {
    const { id } = req.params;

    const type = await fetchType(id, next);

    sendResponse(res, 200, { type });
  }),
);

typeController.post(
  '/type',
  handleAsync(async (req, res, next) => {
    const { name } = req.body;

    await addType(name, next);

    sendResponse(res, 201, null, 'Type created successfully');
  }),
);

typeController.delete(
  '/type/:id',
  handleAsync(async (req, res, next) => {
    const { id } = req.params;

    await removeType(id, next);

    sendResponse(res, 200, null, 'Type deleted successfully');
  }),
);

export default typeController;
