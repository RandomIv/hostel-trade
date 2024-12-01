import { getUserByIdentifier, createUser } from '../services/authService.js';
import { promisify } from 'util';
import {
  generateRefreshToken,
  generateAccessToken,
  verifyRefreshToken,
} from '../utils/authUtils.js';
import handleAsync from '../utils/handleAsync.js';
import COOKIE_OPTIONS from '../config/cookieConfig.js';
import AppError from '../utils/appError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = handleAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const { error } = await createUser(username, email, hashedPassword);

  if (error) return next(error);

  return res
    .status(201)
    .json({ status: 'success', message: 'User registered successfully' });
});
export const login = handleAsync(async (req, res, next) => {
  const { loginIdentifier, password } = req.body;
  const { data: user, error } = await getUserByIdentifier(loginIdentifier);
  if (error) return next(error);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid login or password', 401));
  }
  const payload = { id: user.id };
  const accessToken = await generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(payload);

  res.cookie('refresh_token', refreshToken, COOKIE_OPTIONS);
  res.set('Authorization', `Bearer ${accessToken}`);

  res.status(200).json({
    status: 'success',
    message: 'Logged in successfully',
  });
});

export const logout = handleAsync(async (req, res) => {
  res.clearCookie('refresh_token', COOKIE_OPTIONS);
  res
    .status(200)
    .json({ status: 'success', message: 'Logged out successfully' });
});

export const refresh = handleAsync(async (req, res, next) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return next(new AppError('Refresh token does not exist', 401));
  }

  const payload = verifyRefreshToken(refreshToken);
  const accessToken = generateAccessToken({
    id: payload.id,
  });
  const newRefreshToken = generateRefreshToken({
    id: payload.id,
  });

  res.cookie('refresh_token', newRefreshToken, COOKIE_OPTIONS);
  res.set('Authorization', `Bearer ${accessToken}`);

  res.status().json({
    status: 'success',
    message: 'Token refreshed successfully',
  });
});
