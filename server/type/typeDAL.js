import db from '../config/dbConfig.js';

export const selectTypes = async () => {
  return db.from('type').select('*');
};

export const getTypeById = async (id) => {
  return db.from('type').select('*').eq('id', id).single();
};

export const createType = async (name) => {
  return db.from('type').insert({ name });
};

export const deleteTypeById = async (id) => {
  return db.from('type').delete().eq('id', id);
};
