import jwt from 'jsonwebtoken';
import TOKEN_OPTIONS from '../config/tokenConfig.js';
import { promisify } from 'util';

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
  return promisify(jwt.verify)(token, TOKEN_OPTIONS.access.secret);
};

export const verifyRefreshToken = async (token) => {
  return promisify(jwt.verify)(token, TOKEN_OPTIONS.refresh.secret);
};

export const generateActivationToken = async (payload) => {
  return promisify(jwt.sign)(payload, TOKEN_OPTIONS.access.secret, {
    expiresIn: TOKEN_OPTIONS.activation.expiresIn,
  });
};

export const generateResetToken = async (payload) => {
  return promisify(jwt.sign)(payload, TOKEN_OPTIONS.access.secret, {
    expiresIn: TOKEN_OPTIONS.reset.expiresIn,
  });
};
