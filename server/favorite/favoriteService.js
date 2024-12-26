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

export const addFavorite = async (data, next) => {
  const { error } = await insertFavorite(data);
  if (error) return next(error);
};

export const removeFavorite = async (data, next) => {
  const { error } = await deleteFavoriteById(data);
  if (error) return next(error);
};
