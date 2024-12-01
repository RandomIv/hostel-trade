import db from '../config/db.js';

export const getProductById = async (id) => {
  const { data, error } = await db.from('product').select('*').eq('id', id);

  if (error) throw new Error('Product not found');
  return data[0];
};

export const getAllProducts = async () => {
  const { data, error } = await db.from('product').select('*');
  if (error) throw error;
  return data;
};

export const createProduct = async (
  userId,
  name,
  price,
  typeId,
  description,
) => {
  const { error } = await db
    .from('product')
    .insert({ user_id: userId, name, price, type_id: typeId, description });

  if (error) throw error;
};

export const saveUpdatedProduct = async (
  id,
  name,
  price,
  typeId,
  description,
) => {
  const { error } = await db
    .from('product')
    .update({ name, price, type_id: typeId, description })
    .eq('id', id);

  if (error) throw error;
};

export const deleteProductById = async (id) => {
  const { error } = await db.from('product').delete().eq('id', id);
  if (error) throw error;
};
