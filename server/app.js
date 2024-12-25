import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import express from 'express';
import authController from './auth/authController.js';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import favoriteController from './favorite/favoriteController.js';
import hostelController from './hostel/hostelController.js';
import productController from './product/productController.js';
import typeController from './type/typeController.js';
import userController from './user/userController.js';
import imageController from './image/imageController.js';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
  }),
);
app.use('/api', authController);
app.use('/api', productController);
app.use('/api', userController);
app.use('/api', hostelController);
app.use('/api', typeController);
app.use('/api', favoriteController);
app.use('/api', imageController);
app.use(errorHandler);

export default app;
