import db from '../config/dbConfig.js';

export const selectHostels = async () => {
  return db.from('hostel').select('*');
};

export const getHostelById = async (id) => {
  return db.from('hostel').select('*').eq('id', id).single();
};

export const createHostel = async (number) => {
  return db.from('hostel').insert({ number });
};

export const deleteHostelById = async (id) => {
  return db.from('hostel').delete().eq('id', id);
};
