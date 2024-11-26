import { getUserIdByIdentifier, registerUser, verifyPassword} from '../services/userService.js';
import { generateToken, setTokenCookie, verifyToken } from "../services/authService.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    await registerUser(username, email, password);
    return res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req, res) => {
    const { loginIdentifier, password } = req.body;
    await verifyPassword(loginIdentifier, password);

    const userId = await getUserIdByIdentifier(loginIdentifier);
    const payload = { id: userId };

    const { accessToken, refreshToken } = generateToken(payload);

    setTokenCookie(res, refreshToken);

    res.json({
        message: 'Logged in successfully',
        accessToken,
    });
};

export const logout = async (req, res) => {
    const clearCookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    };
    res.clearCookie('refresh_token', clearCookieOptions);
    res.json({ message: 'Logged out successfully' });
};

export const refresh = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    const payload = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const { accessToken, refreshToken: newRefreshToken } = generateToken({ id: payload.id });

    setTokenCookie(res, newRefreshToken);

    res.json({
        message: 'Token refreshed successfully',
        accessToken,
    });
};
