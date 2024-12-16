import Router from 'express';
import {
  getProduct,
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import setCurrentUserId from '../middlewares/setCurrentUserId.js';

const productRouter = Router();

productRouter
  .route('/product')
  .get(getProducts)
  .post(authenticateToken, setCurrentUserId, postProduct);

productRouter
  .route('/product/:id')
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default productRouter;
