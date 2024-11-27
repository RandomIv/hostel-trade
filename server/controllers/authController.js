import {
  getUserIdByIdentifier,
  registerUser,
  verifyPassword,
} from '../services/authService.js';
import {
  generateToken,
  setTokenCookie,
  verifyToken,
} from '../utils/authUtils.js';
import handleAsync from '../utils/handleAsync.js';
import COOKIE_OPTIONS from '../config/cookieConfig.js';

export const register = handleAsync(async (req, res) => {
  const { username, email, password } = req.body;
  await registerUser(username, email, password);
  return res
    .status(201)
    .json({ status: 'success', message: 'User registered successfully' });
});

export const login = handleAsync(async (req, res) => {
  const { loginIdentifier, password } = req.body;
  await verifyPassword(loginIdentifier, password);

  const userId = await getUserIdByIdentifier(loginIdentifier);
  const payload = { id: userId };

  const { accessToken, refreshToken } = generateToken(payload);

  setTokenCookie(res, refreshToken);

  res.status(200).json({
    status: 'success',
    accessToken,
    message: 'Logged in successfully',
  });
});

export const logout = handleAsync(async (req, res) => {
  res.clearCookie('refresh_token', COOKIE_OPTIONS);
  res
    .status(200)
    .json({ status: 'success', message: 'Logged out successfully' });
});

export const refresh = handleAsync(async (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  const payload = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const { accessToken, refreshToken: newRefreshToken } = generateToken({
    id: payload.id,
  });

  setTokenCookie(res, newRefreshToken);

  res.status().json({
    status: 'success',
    accessToken,
    message: 'Token refreshed successfully',
  });
});
