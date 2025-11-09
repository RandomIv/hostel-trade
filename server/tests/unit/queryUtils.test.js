import { jest } from '@jest/globals';
import applyProductModifiers from '../../utils/queryUtils.js';

describe('applyProductModifiers', () => {
  let mockQuery;

  beforeEach(() => {
    mockQuery = {
      ilike: jest.fn().mockReturnThis(),
      gte: jest.fn().mockReturnThis(),
      lte: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      in: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
    };
  });

  describe('Filtering by name', () => {
    test('should call ilike with correct pattern for name', () => {
      const filter = { name: 'test' };
      applyProductModifiers(mockQuery, filter);
      expect(mockQuery.ilike).toHaveBeenCalledWith('name', '%test%');
      expect(mockQuery.ilike).toHaveBeenCalledTimes(1);
    });

    test('should not call ilike if name is not provided', () => {
      const filter = {};
      applyProductModifiers(mockQuery, filter);
      expect(mockQuery.ilike).not.toHaveBeenCalled();
    });
  });

  describe('Filtering by price', () => {
    test('should call gte for minimum price', () => {
      const filter = { price: { min: 100 } };
      applyProductModifiers(mockQuery, filter);
      expect(mockQuery.gte).toHaveBeenCalledWith('price', 100);
      expect(mockQuery.gte).toHaveBeenCalledTimes(1);
    });

    test('should call lte for maximum price', () => {
      const filter = { price: { max: 500 } };
      applyProductModifiers(mockQuery, filter);
      expect(mockQuery.lte).toHaveBeenCalledWith('price', 500);
      expect(mockQuery.lte).toHaveBeenCalledTimes(1);
    });

    test('should call both methods for a price range', () => {
      const filter = { price: { min: 100, max: 500 } };
      applyProductModifiers(mockQuery, filter);
      expect(mockQuery.gte).toHaveBeenCalledWith('price', 100);
      expect(mockQuery.lte).toHaveBeenCalledWith('price', 500);
    });

    test('should not call gte/lte if price is not provided', () => {
      const filter = {};
      applyProductModifiers(mockQuery, filter);
      expect(mockQuery.gte).not.toHaveBeenCalled();
      expect(mockQuery.lte).not.toHaveBeenCalled();
    });
  });

  describe('Filtering by userId', () => {
    test('should call eq for userId', () => {
      const filter = { userId: '123' };
      applyProductModifiers(mockQuery, filter);
      expect(mockQuery.eq).toHaveBeenCalledWith('user_id', '123');
      expect(mockQuery.eq).toHaveBeenCalledTimes(1);
    });
  });

  describe('Filtering by typeId', () => {
    test('should call in for typeId array', () => {
      const filter = { typeId: [1, 2, 3] };
      applyProductModifiers(mockQuery, filter);
      expect(mockQuery.in).toHaveBeenCalledWith('type_id', [1, 2, 3]);
    });
  });

  describe('Filtering by hostelId', () => {
    test('should call in for hostelId array', () => {
      const filter = { hostelId: [5, 10] };
      applyProductModifiers(mockQuery, filter);
      expect(mockQuery.in).toHaveBeenCalledWith('hostel_id', [5, 10]);
    });
  });
});