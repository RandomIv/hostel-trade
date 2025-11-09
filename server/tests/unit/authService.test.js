import { jest, describe, beforeEach, test, expect } from '@jest/globals';

jest.unstable_mockModule('bcrypt', () => ({
  default: {
    hash: jest.fn(),
    compare: jest.fn(),
  },
}));
jest.unstable_mockModule('../../auth/authDAL.js', () => ({
  insertUser: jest.fn(),
  getUserByIdentifier: jest.fn(),
  setUserVerifiedStatus: jest.fn(),
  updateUserPasswordById: jest.fn(),
}));
jest.unstable_mockModule('../../utils/authUtils.js', () => ({
  generateActivationToken: jest.fn(),
  generateAccessToken: jest.fn(),
  generateRefreshToken: jest.fn(),
  generateResetToken: jest.fn(),
  verifyAccessToken: jest.fn(),
  verifyRefreshToken: jest.fn(),
}));
jest.unstable_mockModule('../../utils/appError.js', () => ({
  default: jest.fn(), 
}));

let bcrypt;
let authService;
let authDAL;
let authUtils;
let AppError;

describe('authService', () => {
  const mockNext = jest.fn();

  beforeEach(async () => {
    bcrypt = (await import('bcrypt')).default;
    authService = await import('../../auth/authService.js');
    authDAL = await import('../../auth/authDAL.js');
    authUtils = await import('../../utils/authUtils.js');
    AppError = (await import('../../utils/appError.js')).default;

    jest.clearAllMocks();
  });

  describe('signup', () => {
    beforeEach(() => {
      bcrypt.hash.mockResolvedValue('$2b$10$hashedpassword');
      authDAL.insertUser.mockResolvedValue({ error: null });
      authUtils.generateActivationToken.mockResolvedValue('activation-token');
    });

    test('should successfully register a user with hashed password', async () => {
      const result = await authService.signup('user','email','pass',mockNext);
      expect(bcrypt.hash).toHaveBeenCalledWith('pass', 10);
      expect(authDAL.insertUser).toHaveBeenCalledWith('user','email','$2b$10$hashedpassword');
      expect(result).toBe('activation-token');
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('should throw an error if hashing fails', async () => {
      const hashError = new Error('Hashing failed');
      bcrypt.hash.mockRejectedValue(hashError);
      await expect(authService.signup('user','email','pass',mockNext)).rejects.toThrow('Hashing failed');
      expect(mockNext).not.toHaveBeenCalled();
      expect(authDAL.insertUser).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    const mockUser = { id: 1, username: 'testuser', password: 'hashedpassword', is_verified: true };

    beforeEach(() => {
      authUtils.generateAccessToken.mockResolvedValue('access-token');
      authUtils.generateRefreshToken.mockResolvedValue('refresh-token');
    });

    test('should successfully log in a user', async () => {
      authDAL.getUserByIdentifier.mockResolvedValue({ data: mockUser, error: null });
      bcrypt.compare.mockResolvedValue(true);

      const result = await authService.login('testuser','password123',mockNext);

      expect(authDAL.getUserByIdentifier).toHaveBeenCalledWith('testuser');
      expect(bcrypt.compare).toHaveBeenCalledWith('password123','hashedpassword');
      expect(authUtils.generateAccessToken).toHaveBeenCalledWith({ id: 1 });
      expect(authUtils.generateRefreshToken).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual({ accessToken: 'access-token', refreshToken: 'refresh-token' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('should call next with AppError if user not found', async () => {
      authDAL.getUserByIdentifier.mockResolvedValue({ data: null, error: null });

      await authService.login('wronguser','password123',mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    test('should call next with AppError if password is incorrect', async () => {
      authDAL.getUserByIdentifier.mockResolvedValue({ data: mockUser, error: null });
      bcrypt.compare.mockResolvedValue(false);

      await authService.login('testuser','wrongpassword',mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
      expect(authUtils.generateAccessToken).not.toHaveBeenCalled();
    });

    test('should call next with AppError if user is not verified', async () => {
      const unverifiedUser = { ...mockUser, is_verified: false };
      authDAL.getUserByIdentifier.mockResolvedValue({ data: unverifiedUser, error: null });
      bcrypt.compare.mockResolvedValue(true);

      await authService.login('testuser','password123',mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
      expect(authUtils.generateAccessToken).not.toHaveBeenCalled();
    });
  });
});