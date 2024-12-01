import express from 'express';
import userRouter from './routes/userRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';
import productRouter from './routes/productRouter.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', userRouter);
app.use('/api', productRouter);
app.use(errorHandler);

export default app;
