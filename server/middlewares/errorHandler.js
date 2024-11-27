import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  // const status = err.message === 'Username is already taken' || err.message === 'Email is already taken' ? 409 : 500;
  res.status(err.statusCode).json({ status: err.status, message: err.message });
};

export default errorHandler;
