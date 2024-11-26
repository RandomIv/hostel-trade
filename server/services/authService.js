import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const TOKEN_OPTIONS = {
    access: { expiresIn: '15m', secret: process.env.ACCESS_TOKEN_SECRET },
    refresh: { expiresIn: '15d', secret: process.env.REFRESH_TOKEN_SECRET },
};

export const generateToken = (payload) => ({
    accessToken: jwt.sign(payload, TOKEN_OPTIONS.access.secret, { expiresIn: TOKEN_OPTIONS.access.expiresIn }),
    refreshToken: jwt.sign(payload, TOKEN_OPTIONS.refresh.secret, { expiresIn: TOKEN_OPTIONS.refresh.expiresIn }),
});

export const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        throw new Error('Invalid Token');
    }
}

export const setTokenCookie = (res, refreshToken) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 15 * 24 * 60 * 60 * 1000,
    };
    res.cookie('refresh_token', refreshToken, cookieOptions);
};
