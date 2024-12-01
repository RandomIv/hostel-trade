import handleAsync from '../utils/handleAsync.js';
import {
  getProductById,
  getAllProducts,
  createProduct,
  saveUpdatedProduct,
  deleteProductById,
} from '../services/productService.js';

export const getProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const { data: product, error } = await getProductById(id);
  if (error) return next(error);
  res.status(200).json({ status: 'success', product: product });
});

export const getProducts = handleAsync(async (req, res, next) => {
  const { data: products, error } = await getAllProducts();
  if (error) return next(error);
  res.status(200).json({ status: 'success', products: products });
});

export const postProduct = handleAsync(async (req, res) => {
  const { userId, name, price, typeId, description } = req.body;
  await createProduct(userId, name, price, typeId, description);
  res
    .status(201)
    .json({ status: 'success', message: 'Product created successfully' });
});

export const updateProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, price, typeId, description } = req.body;
  const { error } = await saveUpdatedProduct(
    id,
    name,
    price,
    typeId,
    description,
  );
  if (error) return next(error);
  res
    .status(200)
    .json({ status: 'success', message: 'Product updated successfully' });
});

export const deleteProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const { error } = await deleteProductById(id);
  if (error) return next(error);
  res
    .status(200)
    .json({ status: 'success', message: 'Product deleted successfully' });
});
