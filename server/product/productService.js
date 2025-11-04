import {
  createProduct,
  deleteProductById,
  getProductById,
  saveUpdatedProduct,
  selectProducts,
} from './productDAL.js';

export const fetchProducts = async (filter, sort, next) => {
  const { data, error } = await selectProducts(filter, sort);
  if (error) return next(error);
  return data;
};

export const fetchProduct = async (id, next) => {
  const { data, error } = await getProductById(id);
  if (error) return next(error);
  return data;
};

export const addProduct = async (userId, productData, next) => {
  const { error } = await createProduct(userId, productData);
  if (error) return next(error);
};

export const updateProduct = async (id, productData, next) => {
  const { error } = await saveUpdatedProduct(id, productData);
  if (error) return next(error);
};

export const removeProduct = async (id, next) => {
  const { error } = await deleteProductById(id);
  if (error) return next(error);
};
