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

export const setUserVerifiedStatus = async (email) => {
  return db.from('user').update({ is_verified: true }).eq('email', email);
};
