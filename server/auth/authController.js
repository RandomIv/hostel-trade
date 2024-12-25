import Router from 'express';
import authenticateToken from '../middlewares/authenticateToken.js';
import handleAsync from '../utils/handleAsync.js';
import {
  sendActivationEmail,
  sendResetPasswordEmail,
} from '../config/emailConfig.js';
import { sendResponse } from '../utils/responseUtils.js';
import AppError from '../utils/appError.js';
import COOKIE_OPTIONS from '../config/cookieConfig.js';
import {
  activate,
  signup,
  forgotPassword,
  login,
  refresh,
  resetPassword,
} from './authService.js';

const authController = Router();

authController.post(
  '/signup',
  handleAsync(async (req, res, next) => {
    const { username, email, password } = req.body;

    const activationToken = await signup(username, email, password, next);
    await sendActivationEmail(email, activationToken);

    sendResponse(
      res,
      201,
      null,
      'User registered successfully. Check your email for activation.',
    );
  }),
);

authController.post(
  '/login',
  handleAsync(async (req, res, next) => {
    const { loginIdentifier, password } = req.body;

    const { accessToken, refreshToken } = await login(
      loginIdentifier,
      password,
      next,
    );

    res.cookie('refresh_token', refreshToken, COOKIE_OPTIONS);

    sendResponse(res, 200, { token: accessToken }, 'Logged in successfully');
  }),
);

authController.get(
  '/logout',
  handleAsync(async (req, res) => {
    res.clearCookie('refresh_token', COOKIE_OPTIONS);
    sendResponse(res, 200, null, 'Logged out successfully');
  }),
);

authController.get(
  '/refresh',
  handleAsync(async (req, res, next) => {
    if (!req?.cookies?.refresh_token) {
      return next(new AppError('Refresh token does not exist', 401));
    }
    const refreshToken = req.cookies.refresh_token;
    const accessToken = await refresh(refreshToken);

    sendResponse(
      res,
      200,
      { token: accessToken },
      'Token refreshed successfully',
    );
  }),
);

authController.get(
  '/activate',
  handleAsync(async (req, res, next) => {
    const { token } = req.query;

    await activate(token, next);

    sendResponse(res, 200, null, 'Account activated successfully.');
  }),
);

authController.post(
  '/forgot-password',
  handleAsync(async (req, res, next) => {
    const { email } = req.body;

    const resetToken = await forgotPassword(email, next);
    await sendResetPasswordEmail(email, resetToken);

    sendResponse(res, 200, null, 'Password reset email sent.');
  }),
);

authController.post(
  '/reset-password',
  handleAsync(async (req, res, next) => {
    const { token } = req.query;
    const { password } = req.body;

    await resetPassword(token, password, next);

    sendResponse(res, 200, null, 'Password reset successfully.');
  }),
);

authController.get(
  '/protect',
  authenticateToken,
  handleAsync(async (req, res) => {
    sendResponse(res, 200, { user: req.user });
  }),
);

export default authController;
