import { insertUserView } from './userViewDAL.js';

const addUserView = async (productId, userId, next) => {
  const { error } = await insertUserView(productId, userId);
  if (error) return next(error);
};

export default addUserView;
