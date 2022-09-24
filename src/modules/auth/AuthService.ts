/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import AppError from '@/utils/AppError';
import { comparePassword, createToken } from '@/utils/password';
import { StatusCodes } from 'http-status-codes';
import Auth from './Auth';
import { AuthLoginType, AuthRegisterType } from './interface';

export default class AuthService {
  public readonly register = async (input: AuthRegisterType) => {
    const doc = await Auth.create(input);
    const result = await doc.save();

    if (result.errors !== undefined) {
      return new AppError(
        'ValidationError',
        StatusCodes.BAD_REQUEST,
        result.errors
      );
    }
    const data = {
      avatar: result.avatar,
      email: result.email,
      name: result.name,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      _id: String(doc._id),
    };

    return data;
  };

  public readonly login = async (input: AuthLoginType) => {
    const auth = await Auth.findOne({ email: input.email });
    if (auth === null) {
      throw new AppError('User not found', StatusCodes.NOT_FOUND, null);
    }
    if (await comparePassword(input.password, auth.password)) {
      const token = createToken(
        { id: auth._id },
        process.env.JWT_SECRET as string
      );
      return token;
    }
    throw new AppError('Invalid password', StatusCodes.UNAUTHORIZED, null);
  };
}
