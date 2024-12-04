import handleAsync from '../utils/handleAsync.js';
import AppError from '../utils/appError.js';
import { verifyAccessToken } from '../utils/authUtils.js';

const authenticateToken = handleAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return next(new AppError('You are not logged in', 401));

  req.user = await verifyAccessToken(token);
  next();
});

export default authenticateToken;
