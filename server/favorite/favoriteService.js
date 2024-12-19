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
        hostel!inner(*)
      )
      `,
    )
    .eq('user_id', userId)
    .eq('product.image.is_main', true);

  query = applyProductModifiers(query, filter, sort);

  return query;
};

export const insertFavorite = async (userId, productId) => {
  return db.from('favorite').insert({ user_id: userId, product_id: productId });
};

export const deleteFavoriteById = async (userId, productId) => {
  return db
    .from('favorite')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);
};
