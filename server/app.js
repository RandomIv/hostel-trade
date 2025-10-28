import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import express from 'express';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
  }),
);

app.use(errorHandler);

export default app;
