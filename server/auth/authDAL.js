import db from '../config/dbConfig.js';

export const insertUser = async (username, email, password) => {
  return db.from('user').insert({ username, email, password });
};

export const getUserByIdentifier = async (identifier) => {
  return db
    .from('user')
    .select('*')
    .or(`username.eq.${identifier},email.eq.${identifier}`)
    .single();
};

export const setUserVerifiedStatus = async (email) => {
  return db.from('user').update({ is_verified: true }).eq('email', email);
};

export const updateUserPasswordById = async (id, password) => {
  return db.from('user').update({ password }).eq('id', id);
};
