import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
    logger.error({
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
        body: req.body,
        query: req.query,
    });

    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    res.status(statusCode).json({ status, message: err.message });
};

export default errorHandler;
