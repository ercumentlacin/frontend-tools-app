import AppError from '@/utils/AppError';
import { StatusCodes } from 'http-status-codes';
import Auth from './Auth';
import { AuthLoginType, AuthRegisterType } from './interface';

export default class AuthService {
  public readonly register = async (input: AuthRegisterType) => {
    const auth = new Auth(input);
    const result = await auth.save();

    if (result.errors !== undefined) {
      return new AppError(
        'ValidationError',
        StatusCodes.BAD_REQUEST,
        result.errors
      );
    }
    return result;
  };

  public readonly login = async (input: AuthLoginType) => {
    const auth = await Auth.findOne({ email: input.email });
    if (auth === null) {
      throw new AppError('User not found', StatusCodes.NOT_FOUND, null);
    }
    if (auth.password !== input.password) {
      throw new AppError('Invalid password', StatusCodes.UNAUTHORIZED, null);
    }
    return auth;
  };
}
