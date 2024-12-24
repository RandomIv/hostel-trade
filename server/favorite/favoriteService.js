import {
  deleteFavoriteById,
  insertFavorite,
  selectFavorites,
} from './favoriteDAL.js';

export const getFavorites = async (userId, filter, sort, next) => {
  const { data, error } = await selectFavorites(userId, filter, sort);
  if (error) return next(error);
  return data;
};

export const addFavorite = async (userId, productId, next) => {
  const { error } = await insertFavorite(userId, productId);
  if (error) return next(error);
};

export const removeFavorite = async (userId, productId, next) => {
  const { error } = await deleteFavoriteById(userId, productId);
  if (error) return next(error);
};
