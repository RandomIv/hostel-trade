import db from '../config/dbConfig.js';

export const insertUserView = async (productId, userId) => {
  return db
    .from('user_view')
    .upsert(
      { product_id: productId, user_id: userId },
      { onConflict: 'product_id, user_id' },
    );
};
