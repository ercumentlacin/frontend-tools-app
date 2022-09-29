import AppError from '@/utils/AppError';
import connectToDb from './connectToDB';

describe('connectToDb()', () => {
  test('should connect to the database', (done) => {
    connectToDb()
      .then(() => {})
      .catch((error) => {
        expect(error).toBeInstanceOf(AppError);
        expect(error.name).toBe('Database connection error');
        expect(error.httpCode).toBe(500);
        expect(error.details).toBeDefined();
      })
      .finally(done);
  });

  test('should trhow an error if MONGO_URI is undefined', (done) => {
    process.env.MONGO_URI = undefined;

    connectToDb()
      .then(() => {})
      .catch((error) => {
        expect(error).toBeInstanceOf(AppError);
        expect(error.name).toBe('MONGO_URI is undefined');
        expect(error.httpCode).toBe(500);
        expect(error.details).toBeDefined();
      })
      .finally(done);
  });
});
