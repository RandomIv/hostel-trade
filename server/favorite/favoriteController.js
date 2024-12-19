import handleAsync from '../utils/handleAsync.js';
import { sendResponse } from '../utils/responseUtils.js';
import {
  deleteFavoriteById,
  insertFavorite,
  selectFavorites,
} from './favoriteService.js';

export const getFavorites = handleAsync(async (req, res, next) => {
  const { id: userId } = req.params;
  const filter = JSON.parse(req.query?.filter);
  const sort = JSON.parse(req.query?.sort);

  const { data: favorites, error } = await selectFavorites(
    userId,
    filter,
    sort,
  );
  if (error) return next(error);

  sendResponse(res, 200, { favorites });
});

export const addFavorite = handleAsync(async (req, res, next) => {
  const { id: userId } = req.params;
  const { productId } = req.body;

  const { error } = await insertFavorite(userId, productId);
  if (error) return next(error);

  sendResponse(res, 201, null, 'Favorite added successfully');
});

export const deleteFavorite = handleAsync(async (req, res, next) => {
  const { id: userId } = req.params;
  const { productId } = req.body;

  const { error } = await deleteFavoriteById(userId, productId);
  if (error) return next(error);

  sendResponse(res, 200, null, 'Favorite deleted successfully');
});
