import dotenv from 'dotenv';
import express from 'express';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authController from "./auth/authController.js";
import userController from "./user/userController.js";
import hostelController from "./hostel/hostelController.js";
import typeController from "./type/typeController.js";

dotenv.config({path: '../.env'});

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
app.use('/api', userController);
app.use('/api', hostelController);
app.use('/api', typeController);

app.use(errorHandler);

export default app;
