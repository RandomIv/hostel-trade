import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Strict',
  maxAge: 15 * 24 * 60 * 60 * 1000,
};

export default COOKIE_OPTIONS;
