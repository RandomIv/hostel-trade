import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import TOKEN_OPTIONS from '../config/tokenConfig.js';
import { promisify } from 'util';

dotenv.config({ path: '../.env' });

export const generateRefreshToken = async (payload) => {
  return promisify(jwt.sign)(payload, TOKEN_OPTIONS.refresh.secret, {
    expiresIn: TOKEN_OPTIONS.refresh.expiresIn,
  });
};
export const generateAccessToken = async (payload) => {
  return promisify(jwt.sign)(payload, TOKEN_OPTIONS.access.secret, {
    expiresIn: TOKEN_OPTIONS.access.expiresIn,
  });
};
export const verifyAccessToken = async (token) => {
  return promisify(jwt.verify)(token, process.env.ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = async (token) => {
  return promisify(jwt.verify)(token, process.env.REFRESH_TOKEN_SECRET);
};
