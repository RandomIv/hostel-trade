import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({ status: err.status, message: err.message });
};

export default errorHandler;
