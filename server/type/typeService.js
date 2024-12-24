import {
  createType,
  deleteTypeById,
  getTypeById,
  selectTypes,
} from './typeDAL.js';

export const fetchTypes = async (next) => {
  const { data, error } = await selectTypes();
  if (error) return next(error);
  return data;
};

export const fetchType = async (id, next) => {
  const { data, error } = await getTypeById(id);
  if (error) return next(error);
  return data;
};

export const addType = async (name, next) => {
  const { error } = await createType(name);
  if (error) return next(error);
};

export const removeType = async (id, next) => {
  const { error } = await deleteTypeById(id);
  if (error) return next(error);
};
