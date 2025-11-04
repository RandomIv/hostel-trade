import handleAsync from '../utils/handleAsync.js';
import { sendResponse } from '../utils/responseUtils.js';
import Router from 'express';
import authenticateToken from '../middlewares/authenticateToken.js';
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from './favoriteService.js';
import { toSnakeCase } from '../utils/objectUtils.js';

const favoriteController = Router();

favoriteController.get(
  '/favorite',
  authenticateToken,
  handleAsync(async (req, res, next) => {
    const userId = req.user.id;
    const filter = JSON.parse(req.query?.filter);
    const sort = JSON.parse(req.query?.sort);

    const favorites = await getFavorites(userId, filter, sort, next);

    sendResponse(res, 200, { favorites });
  }),
);

favoriteController.post(
  '/favorite',
  authenticateToken,
  handleAsync(async (req, res, next) => {
    const userId = req.user.id;
    const data = toSnakeCase({ ...req.body, userId });

    await addFavorite(data, next);

    sendResponse(res, 201, null, 'Favorite added successfully');
  }),
);

favoriteController.delete(
  '/favorite/:id',
  authenticateToken,
  handleAsync(async (req, res, next) => {
    const userId = req.user.id;
    const data = toSnakeCase({ ...req.body, userId });

    await removeFavorite(data, next);

    sendResponse(res, 200, null, 'Favorite deleted successfully');
  }),
);

export default favoriteController;
