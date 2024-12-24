import express from 'express';
import authController from './auth/authController.js';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';
import productRouter from './product/productRouter.js';
import userRouter from './user/userRouter.js';
import cookieParser from 'cookie-parser';
import hostelRouter from './hostel/hostelRouter.js';
import typeRouter from './type/typeRouter.js';
import dotenv from 'dotenv';
import favoriteController from './favorite/favoriteController.js';

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
app.use('/api', productRouter);
app.use('/api', userRouter);
app.use('/api', hostelRouter);
app.use('/api', typeRouter);
app.use('/api', favoriteController);
app.use(errorHandler);

export default app;
