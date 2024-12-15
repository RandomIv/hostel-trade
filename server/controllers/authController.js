import {
  getUserByIdentifier,
  createUser,
  setUserVerifiedStatus,
} from '../services/authService.js';
import {
  generateRefreshToken,
  generateAccessToken,
  verifyRefreshToken,
  generateActivationToken,
  verifyAccessToken,
} from '../utils/authUtils.js';
import handleAsync from '../utils/handleAsync.js';
import COOKIE_OPTIONS from '../config/cookieConfig.js';
import AppError from '../utils/appError.js';
import bcrypt from 'bcrypt';
import { sendResponse } from '../utils/responseUtils.js';
import dotenv from 'dotenv';
import { sendEmail } from '../config/emailConfig.js';

dotenv.config({ path: '../.env' });

export const signup = handleAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const { error } = await createUser(username, email, hashedPassword);
  if (error) return next(error);

  const activationToken = await generateActivationToken({ email });
  const activationLink = `${process.env.CLIENT_URL}/activate-account?token=${activationToken}`;

  await sendEmail(
    email,
    'Activate your account',
    `
    <p>Please activate your account by clicking the link below:</p>
    <a href="${activationLink}">Activate Account</a>
  `,
  );

  sendResponse(
    res,
    201,
    null,
    'User registered successfully. Check your email for activation.',
  );
});

export const login = handleAsync(async (req, res, next) => {
  const { loginIdentifier, password } = req.body;

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

  res.cookie('refresh_token', refreshToken, COOKIE_OPTIONS);

  sendResponse(res, 200, { token: accessToken }, 'Logged in successfully');
});

export const logout = handleAsync(async (req, res) => {
  res.clearCookie('refresh_token', COOKIE_OPTIONS);
  sendResponse(res, 200, null, 'Logged out successfully');
});

export const refresh = handleAsync(async (req, res, next) => {
  if (!req?.cookies?.refresh_token) {
    return next(new AppError('Refresh token does not exist', 401));
  }
  const refreshToken = req.cookies.refresh_token;
  const payload = await verifyRefreshToken(refreshToken);
  const accessToken = await generateAccessToken({
    id: payload.id,
  });

  sendResponse(
    res,
    200,
    { token: accessToken },
    'Token refreshed successfully',
  );
});

export const activateAccount = handleAsync(async (req, res, next) => {
  const { token } = req.query;
  const { email } = await verifyAccessToken(token);

  const { error } = await setUserVerifiedStatus(email);
  if (error) return next(error);

  sendResponse(res, 200, null, 'Account activated successfully.');
});

export const protect = handleAsync(async (req, res) => {
  sendResponse(res, 200, { user: req.user });
});
