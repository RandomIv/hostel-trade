import db from '../config/dbConfig.js';
import applyProductModifiers from '../utils/queryUtils.js';

export const getProductById = async (id) => {
  return db
    .from('product')
    .select(
      `
      id,
      name,
      price,
      description,
      created_at,
      updated_at,
      is_active,
      views_count,
      image(id, url, is_main),
      type(*),
      user(id, username, first_name, last_name, email, avatar_img, phone_number, created_at),
      hostel(*)
    `
    )
    .eq('id', id)
    .single();
};

export const selectProducts = async (filter, sort) => {
  let query = db
    .from('product')
    .select(
      `
      *,
      image(id, url, is_main),
      type(*),
      hostel!inner(*)
    `
    )
    .eq('image.is_main', true);

  query = applyProductModifiers(query, filter, sort);

  return query;
};

export const createProduct = async (userId, data) => {
  return db.from('product').insert({ user_id: userId, ...data });
};

export const saveUpdatedProduct = async (id, data) => {
  return db.from('product').update(data).eq('id', id);
};

export const deleteProductById = async (id) => {
  return db.from('product').delete().eq('id', id);
};
