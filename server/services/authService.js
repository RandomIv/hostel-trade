import db from '../config/db.js';

export const createUser = async (username, email, password) => {
  return db.from('user').insert({ username, email, password });
};
export const getUserByIdentifier = async (identifier) => {
  return db
    .from('user')
    .select('*')
    .or(`username.eq.${identifier},email.eq.${identifier}`)
    .single();
};
