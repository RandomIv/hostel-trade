import {
  createHostel,
  deleteHostelById,
  getHostelById,
  selectHostels,
} from './hostelDAL.js';

export const getAllHostels = async (next) => {
  const { data, error } = await selectHostels();
  if (error) return next(error);
  return data;
};

export const getHostel = async (id, next) => {
  const { data, error } = await getHostelById(id);
  if (error) return next(error);
  return data;
};

export const addHostel = async (number, next) => {
  const { error } = await createHostel(number);
  if (error) return next(error);
};

export const removeHostel = async (id, next) => {
  const { error } = await deleteHostelById(id);
  if (error) return next(error);
};
