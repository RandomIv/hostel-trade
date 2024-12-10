import db from '../config/db.js';
import applyQueryModifiers from '../utils/queryUtils.js';

export const getProductById = async (id) => {
  return db
    .from('product')
    .select(
      `
      *,
      image(*),
      type(*)
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
      image(*)
    `,
    )
    .eq('image.is_main', true);

  query = applyQueryModifiers(query, 'ilike', 'name', `%${filter.name}%`);
  query = applyQueryModifiers(query, 'gte', 'price', filter.price.min);
  query = applyQueryModifiers(query, 'gte', 'price', filter.price.max);
  query = applyQueryModifiers(query, 'in', 'type_id', filter.typeId);
  query = applyQueryModifiers(query, 'order', 'price', {
    ascending: sort.price === 'asc',
  });
  query = applyQueryModifiers(query, 'order', 'created_at', {
    ascending: sort.date === 'asc',
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
