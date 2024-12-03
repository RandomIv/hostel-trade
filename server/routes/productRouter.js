import Router from 'express';
import {
  getProduct,
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const productRouter = Router();

productRouter.route('/product').get(getProducts).post(postProduct);

productRouter
  .route('/product/:id')
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default productRouter;
