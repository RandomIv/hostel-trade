import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
    logger.error(err.message, { stack: err.stack });

    const status = err.message === 'Username is already taken' || err.message === 'Email is already taken' ? 409 : 500;
    res.status(status).json({ error: err.message || 'Internal Server Error' });
};

export default errorHandler;
