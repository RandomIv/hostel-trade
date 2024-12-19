import handleAsync from '../utils/handleAsync.js';
import {
  getProductById,
  selectProducts,
  createProduct,
  saveUpdatedProduct,
  deleteProductById,
} from './productService.js';
import { sendResponse } from '../utils/responseUtils.js';
import { toSnakeCase } from '../utils/objectUtils.js';

export const getProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;

  const { data: product, error } = await getProductById(id);
  if (error) return next(error);

  sendResponse(res, 200, { product });
});

export const getProducts = handleAsync(async (req, res, next) => {
  const filter = JSON.parse(req.query?.filter);
  const sort = JSON.parse(req.query?.sort);

  const { data: products, error } = await selectProducts(filter, sort);
  if (error) return next(error);

  sendResponse(res, 200, { products });
});

export const postProduct = handleAsync(async (req, res, next) => {
  const dataToCreate = toSnakeCase(req.body);
  const { id: userId } = req.params;

  const { error } = await createProduct(userId, dataToCreate);
  if (error) return next(error);

  sendResponse(res, 201, null, 'Product created successfully');
});

export const updateProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const dataToUpdate = toSnakeCase(req.body);

  const { error } = await saveUpdatedProduct(id, dataToUpdate);
  if (error) return next(error);

  sendResponse(res, 200, null, 'Product updated successfully');
});

export const deleteProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;

  const { error } = await deleteProductById(id);
  if (error) return next(error);

  sendResponse(res, 200, null, 'Product deleted successfully');
});
