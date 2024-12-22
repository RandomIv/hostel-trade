import Router from 'express';
import authenticateToken from '../middlewares/authenticateToken.js';
import {
  addFavorite,
  deleteFavorite,
  getFavorites,
} from './favoriteController.js';

const favoriteRouter = new Router();

favoriteRouter.get('/favorite', authenticateToken, getFavorites);
favoriteRouter.post('/favorite', authenticateToken, addFavorite);
favoriteRouter.delete('/favorite/:id', authenticateToken, deleteFavorite);

export default favoriteRouter;
