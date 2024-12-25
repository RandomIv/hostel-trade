import handleAsync from '../utils/handleAsync.js';
import { sendResponse } from '../utils/responseUtils.js';
import Router from 'express';
import authenticateToken from '../middlewares/authenticateToken.js';
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from './favoriteService.js';
import setCurrentUserId from '../middlewares/setCurrentUserId.js';

const favoriteController = Router();

favoriteController.get(
  '/favorite',
  authenticateToken,
  setCurrentUserId,
  handleAsync(async (req, res, next) => {
    const { id: userId } = req.params;
    const filter = JSON.parse(req.query?.filter);
    const sort = JSON.parse(req.query?.sort);

    const favorites = await getFavorites(userId, filter, sort, next);

    sendResponse(res, 200, { favorites });
  }),
);

favoriteController.post(
  '/favorite',
  authenticateToken,
  setCurrentUserId,
  handleAsync(async (req, res, next) => {
    const { id: userId } = req.params;
    const { productId } = req.body;

    await addFavorite(userId, productId, next);

    sendResponse(res, 201, null, 'Favorite added successfully');
  }),
);

favoriteController.delete(
  '/favorite/:id',
  authenticateToken,
  setCurrentUserId,
  handleAsync(async (req, res, next) => {
    const { id: userId } = req.params;
    const { productId } = req.body;

    await removeFavorite(userId, productId, next);

    sendResponse(res, 200, null, 'Favorite deleted successfully');
  }),
);

export default favoriteController;
