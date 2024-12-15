import express from 'express';
import authRouter from './routes/authRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import cookieParser from 'cookie-parser';
import hostelRouter from './routes/hostelRouter.js';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use('/api', authRouter);
app.use('/api', productRouter);
app.use('/api', userRouter);
app.use('/api', hostelRouter);
app.use(errorHandler);

export default app;
