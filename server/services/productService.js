import db from '../config/db.js';

export const getProductById = async (id) => {
  return db.from('product').select('*').eq('id', id);
};

export const getAllProducts = async () => {
  return db.from('product').select('*');
};

export const createProduct = async (data) => {
  return db.from('product').insert({ data });
};

export const saveUpdatedProduct = async (id, data) => {
  return db.from('product').update({ data }).eq('id', id);
};

export const deleteProductById = async (id) => {
  return db.from('product').delete().eq('id', id);
};
