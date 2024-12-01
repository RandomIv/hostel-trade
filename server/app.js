import express from 'express';
import router from './routes/userRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use(errorHandler);

export default app;
