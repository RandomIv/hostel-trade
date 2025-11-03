import bcrypt from 'bcrypt';
import {
  getUserByIdentifier,
  insertUser,
  setUserVerifiedStatus,
  updateUserPasswordById,
} from './authDAL.js';
import AppError from '../utils/appError.js';
import {
  generateAccessToken,
  generateActivationToken,
  generateRefreshToken,
  generateResetToken,
  verifyAccessToken,
  verifyRefreshToken,
} from '../utils/authUtils.js';

export const signup = async (username, email, password, next) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { error } = await insertUser(username, email, hashedPassword);
  if (error) return next(error);

  const activationToken = await generateActivationToken({ email });

  return activationToken;
};

export const login = async (loginIdentifier, password, next) => {
  const { data: user, error } = await getUserByIdentifier(loginIdentifier);
  if (error) return next(error);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid login or password', 401));
  }

  if (!user.is_verified) {
    return next(
      new AppError('Email not verified. Please check your inbox.', 403),
    );
  }

  const payload = { id: user.id };
  const accessToken = await generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(payload);

  return { accessToken, refreshToken };
};

export const refresh = async (refreshToken) => {
  const payload = await verifyRefreshToken(refreshToken);
  const accessToken = await generateAccessToken({
    id: payload.id,
  });
  return accessToken;
};

export const activate = async (token, next) => {
  const { email } = await verifyAccessToken(token);

  const { error } = await setUserVerifiedStatus(email);
  if (error) return next(error);
};

export const forgotPassword = async (email, next) => {
  const { data: user, error } = await getUserByIdentifier(email);
  if (error) return next(error);

  const resetToken = await generateResetToken({ id: user.id });

  return resetToken;
};

export const resetPassword = async (token, password, next) => {
  const { id } = await verifyAccessToken(token);

  const hashedPassword = await bcrypt.hash(password, 10);

  const { error } = await updateUserPasswordById(id, hashedPassword);
  if (error) return next(error);
};
