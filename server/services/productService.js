import db from '../config/db.js';

export const getProductById = async (id) => {
  return db.from('product').select('*').eq('id', id);
};

export const getAllProducts = async () => {
  return db.from('product').select('*');
};

export const createProduct = async (
  userId,
  name,
  price,
  typeId,
  description,
) => {
  return db
    .from('product')
    .insert({ user_id: userId, name, price, type_id: typeId, description });
};

export const saveUpdatedProduct = async (
  id,
  name,
  price,
  typeId,
  description,
) => {
  return db
    .from('product')
    .update({ name, price, type_id: typeId, description })
    .eq('id', id);
};

export const deleteProductById = async (id) => {
  return db.from('product').delete().eq('id', id);
};
