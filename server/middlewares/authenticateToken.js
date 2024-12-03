import jwt from 'jsonwebtoken';
import handleAsync from '../utils/handleAsync.js';
import AppError from '../utils/appError.js';
import { promisify } from 'util';

const authenticateToken = handleAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return next(new AppError('You are not logged in', 401));

  const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  req.user = payload;
  next();
});

export default authenticateToken;
