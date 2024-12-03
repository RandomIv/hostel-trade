import db from '../config/db.js';

export const getUserById = async (id) => {
  return db.from('user').select('*').eq('id', id);
};
export const updateUserById = async (id, data) => {
  return db.from('user').update(data).eq('id', id);
};

export const deleteUserById = async (id) => {
  return db.from('user').delete().eq('id', id);
};
