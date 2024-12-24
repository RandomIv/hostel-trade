import express from 'express';
import authController from './auth/authController.js';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';
import userRouter from './user/userRouter.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import favoriteController from './favorite/favoriteController.js';
import hostelController from './hostel/hostelController.js';
import productController from './product/productController.js';
import typeController from './type/typeController.js';

const app = express();

dotenv.config({ path: '../.env' });

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
app.use('/api', userRouter);
app.use('/api', hostelController);
app.use('/api', typeController);
app.use('/api', favoriteController);
app.use(errorHandler);

export default app;
