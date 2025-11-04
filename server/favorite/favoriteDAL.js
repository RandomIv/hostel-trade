import db from '../config/dbConfig.js';
import applyProductModifiers from '../utils/queryUtils.js';

export const selectFavorites = async (userId, filter = {}, sort = {}) => {
  let query = db
    .from('favorite')
    .select(
      `
      *,
      product!inner(*, 
        image(id, url, is_main), 
        type(*), 
        hostel(*)
      )
      `,
    )
    .eq('user_id', userId)
    .eq('product.image.is_main', true);

  query = applyProductModifiers(query, filter, sort, 'product');

  return query;
};

export const insertFavorite = async (data) => {
  return db.from('favorite').insert(data);
};

export const deleteFavoriteById = async ({ user_id, product_id }) => {
  return db
    .from('favorite')
    .delete()
    .eq('user_id', user_id)
    .eq('product_id', product_id);
};
