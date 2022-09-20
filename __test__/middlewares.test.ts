import { mockExpress } from '@/utils/setupTest';
import { notFound, errorHandler } from '../src/middlewares';

describe('middlewares', () => {
  describe('notFound', () => {
    it('should be defined', () => {
      expect(notFound).toBeDefined();
    });

    it('should be of type Function', () => {
      expect(notFound).toBeInstanceOf(Function);
    });
  });

  describe('errorHandler', () => {
    it('should be defined', () => {
      expect(errorHandler).toBeDefined();
    });

    it('should be of type Function', () => {
      expect(errorHandler).toBeInstanceOf(Function);
    });

    it('should return 500', async () => {
      const { req, res, next } = mockExpress();

      errorHandler(new Error('test'), req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: expect.any(String),
        stack: expect.any(String),
      });
    });
  });
});
