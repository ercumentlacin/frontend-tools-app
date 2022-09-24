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

  public readonly findMany = async () => {
    const docs = await Auth.find();
    const data = docs.map((doc) => ({
      avatar: doc.avatar,
      email: doc.email,
      name: doc.name,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      _id: String(doc._id),
    }));
    return data;
  };

  public readonly findOne = async (id: string) => {
    const doc = await Auth.findById(id);
    if (doc === null) {
      throw new AppError('User not found', StatusCodes.NOT_FOUND, null);
    }
    const data = {
      avatar: doc.avatar,
      email: doc.email,
      name: doc.name,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      _id: String(doc._id),
    };
    return data;
  };

  public readonly updateOne = async (id: string, input: AuthRegisterType) => {
    const isEmailAlreadyExist = await Auth.findOne({ email: input.email });
    const isEmailExist = isEmailAlreadyExist !== null;
    const userEmailEqual = isEmailExist
      ? isEmailAlreadyExist.email === input.email
      : false;

    if (userEmailEqual) {
      throw new AppError(
        'Email already exist',
        StatusCodes.UNPROCESSABLE_ENTITY,
        null
      );
    }
    const doc = await Auth.findByIdAndUpdate(id, input, { new: true });
    if (doc === null) {
      throw new AppError('User not found', StatusCodes.NOT_FOUND, null);
    }
    const data = {
      avatar: doc.avatar,
      email: doc.email,
      name: doc.name,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      _id: String(doc._id),
    };
    return data;
  };

  public readonly deleteOne = async (id: string) => {
    const doc = await Auth.findByIdAndDelete(id);
    if (doc === null) {
      throw new AppError('User not found', StatusCodes.NOT_FOUND, null);
    }
    const data = {
      avatar: doc.avatar,
      email: doc.email,
      name: doc.name,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      _id: String(doc._id),
    };
    return data;
  };

  public readonly me = async (id: string) => {
    const doc = await Auth.findById(id);
    if (doc === null) {
      throw new AppError('User not found', StatusCodes.NOT_FOUND, null);
    }
    const data = {
      avatar: doc.avatar,
      email: doc.email,
      name: doc.name,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      _id: String(doc._id),
    };
    return data;
  };
}
