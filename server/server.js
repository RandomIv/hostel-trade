import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import app from './app.js';

const port = process.env.PORT || 3000;

const startServer = () => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

startServer();
