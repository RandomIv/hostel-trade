import db from '../config/db.js';
import applyQueryModifiers from '../utils/queryUtils.js';

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
    `,
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
    `,
    )
    .eq('image.is_main', true);

  query = applyQueryModifiers(query, 'ilike', 'name', `%${filter?.name}%`);
  query = applyQueryModifiers(query, 'gte', 'price', filter?.price?.min);
  query = applyQueryModifiers(query, 'lte', 'price', filter?.price?.max);
  query = applyQueryModifiers(query, 'in', 'type_id', filter?.typeId);
  query = applyQueryModifiers(query, 'in', 'hostel.number', filter?.hostel);
  query = applyQueryModifiers(query, 'order', 'price', {
    ascending: sort?.price === 'asc',
  });
  query = applyQueryModifiers(query, 'order', 'created_at', {
    ascending: sort?.date === 'asc',
  });

  return query;
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
