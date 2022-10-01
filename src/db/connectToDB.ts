import { connect } from 'mongoose';
import AppError from '@/utils/AppError';

export default async function connectToDb() {
  const { MONGO_URI } = process.env;

  if ([undefined, 'undefined'].some((v) => v === MONGO_URI)) {
    throw new AppError('MONGO_URI is undefined', 500, {
      MONGO_URI,
    });
  }

  try {
    await connect(MONGO_URI as string);
  } catch (error: any) {
    throw new AppError('Database connection error', 500, error);
  }
}
