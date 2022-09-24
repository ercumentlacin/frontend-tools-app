import { connect } from 'mongoose';
import AppError from '@/utils/AppError';

export default async function connectToDb() {
  const { MONGO_URI } = process.env;

  if (typeof MONGO_URI === 'undefined') {
    throw new AppError('MONGO_URI is undefined', 500, {
      MONGO_URI,
    });
  }

  try {
    await connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error: any) {
    console.log(error?.message);
    throw new AppError('Database connection error', 500, error);
  }
}
