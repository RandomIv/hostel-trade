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

  describe('Sorting', () => {
    test('should call order for price ascending', () => {
      const sort = { price: 'asc' };
      applyProductModifiers(mockQuery, {}, sort);
      expect(mockQuery.order).toHaveBeenCalledWith('price', { ascending: true });
    });

    test('should call order for price descending', () => {
      const sort = { price: 'desc' };
      applyProductModifiers(mockQuery, {}, sort);
      expect(mockQuery.order).toHaveBeenCalledWith('price', { ascending: false });
    });

    test('should call order for date ascending', () => {
      const sort = { date: 'asc' };
      applyProductModifiers(mockQuery, {}, sort);
      expect(mockQuery.order).toHaveBeenCalledWith('created_at', { ascending: true });
    });

    test('should call order for date descending', () => {
      const sort = { date: 'desc' };
      applyProductModifiers(mockQuery, {}, sort);
      expect(mockQuery.order).toHaveBeenCalledWith('created_at', { ascending: false });
    });
  });

  describe('Nested column handling', () => {
    test('should prefix column when column parameter is provided', () => {
      const filter = { name: 'test', price: { min: 100 } };
      const column = 'product';
      applyProductModifiers(mockQuery, filter, {}, column);
      expect(mockQuery.ilike).toHaveBeenCalledWith('product.name', '%test%');
      expect(mockQuery.gte).toHaveBeenCalledWith('product.price', 100);
    });

    test('should not prefix column if column parameter is empty', () => {
      const filter = { name: 'test' };
      applyProductModifiers(mockQuery, filter, {}, '');
      expect(mockQuery.ilike).toHaveBeenCalledWith('name', '%test%');
    });
  });

  describe('Complex scenarios', () => {
    test('should apply multiple filters at once', () => {
      const filter = {
        name: 'laptop',
        price: { min: 100, max: 1000 },
        userId: 'user123',
        typeId: [1, 2],
        hostelId: [5]
      };
      const sort = { price: 'asc', date: 'desc' };
      applyProductModifiers(mockQuery, filter, sort);
      expect(mockQuery.ilike).toHaveBeenCalledWith('name', '%laptop%');
      expect(mockQuery.gte).toHaveBeenCalledWith('price', 100);
      expect(mockQuery.lte).toHaveBeenCalledWith('price', 1000);
      expect(mockQuery.eq).toHaveBeenCalledWith('user_id', 'user123');
      expect(mockQuery.in).toHaveBeenCalledWith('type_id', [1, 2]);
      expect(mockQuery.in).toHaveBeenCalledWith('hostel_id', [5]);
      expect(mockQuery.order).toHaveBeenCalledWith('price', { ascending: true });
      expect(mockQuery.order).toHaveBeenCalledWith('created_at', { ascending: false });
    });

    test('should return the same query object for chaining', () => {
      const filter = { name: 'test' };
      const result = applyProductModifiers(mockQuery, filter);
      expect(result).toBe(mockQuery);
    });

    test('should work correctly with empty parameters', () => {
      const result = applyProductModifiers(mockQuery);
      expect(result).toBe(mockQuery);
      expect(mockQuery.ilike).not.toHaveBeenCalled();
      expect(mockQuery.gte).not.toHaveBeenCalled();
      expect(mockQuery.lte).not.toHaveBeenCalled();
      expect(mockQuery.eq).not.toHaveBeenCalled();
      expect(mockQuery.in).not.toHaveBeenCalled();
      expect(mockQuery.order).not.toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    test('should ignore undefined values in filters', () => {
      const filter = {
        name: undefined,
        price: { min: undefined, max: undefined },
        userId: undefined
      };
      applyProductModifiers(mockQuery, filter);
      expect(mockQuery.ilike).not.toHaveBeenCalled();
      expect(mockQuery.gte).not.toHaveBeenCalled();
      expect(mockQuery.lte).not.toHaveBeenCalled();
      expect(mockQuery.eq).not.toHaveBeenCalled();
    });

    test('should handle zero price values correctly', () => {
      const filter = { price: { min: 0 } };
      applyProductModifiers(mockQuery, filter);
      expect(mockQuery.gte).not.toHaveBeenCalled();
    });

    test('should work with empty typeId and hostelId arrays', () => {
      const filter = { typeId: [], hostelId: [] };
      applyProductModifiers(mockQuery, filter);
      expect(mockQuery.in).toHaveBeenCalledWith('type_id', []);
      expect(mockQuery.in).toHaveBeenCalledWith('hostel_id', []);
    });
  });
});