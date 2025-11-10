import handleAsync from '../utils/handleAsync.js';
import { sendResponse } from '../utils/responseUtils.js';
import { toSnakeCase } from '../utils/objectUtils.js';
import Router from 'express';
import authenticateToken from '../middlewares/authenticateToken.js';
import {
    addProduct,
    fetchProduct,
    fetchProducts,
    removeProduct,
    updateProduct,
} from './productService.js';

const productController = Router();

productController.get(
    '/product',
    handleAsync(async (req, res, next) => {
        const filter = JSON.parse(req.query?.filter || '{}');
        const sort = JSON.parse(req.query?.sort || '{}');

        const products = await fetchProducts(filter, sort, next);

        sendResponse(res, 200, { products });
    }),
);

productController.get(
    '/product/:id',
    handleAsync(async (req, res, next) => {
        const { id } = req.params;

        const product = await fetchProduct(id, next);

        sendResponse(res, 200, { product });
    }),
);

productController.post(
    '/product',
    authenticateToken,
    handleAsync(async (req, res, next) => {
        const dataToCreate = toSnakeCase(req.body);
        const userId = req.user.id;

        await addProduct(userId, dataToCreate, next);

        sendResponse(res, 201, null, 'Product created successfully');
    }),
);

productController.patch(
    '/product/:id',
    handleAsync(async (req, res, next) => {
        const { id } = req.params;
        const dataToUpdate = toSnakeCase(req.body);

        await updateProduct(id, dataToUpdate, next);

        sendResponse(res, 200, null, 'Product updated successfully');
    }),
);

productController.delete(
    '/product/:id',
    handleAsync(async (req, res, next) => {
        const { id } = req.params;

        await removeProduct(id, next);

        sendResponse(res, 200, null, 'Product deleted successfully');
    }),
);

export default productController;
