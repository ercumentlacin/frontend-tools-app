import { Document, Model, Types } from 'mongoose';
import z from 'zod';

import * as authSchemas from './authSchemas';

export type AuthRegisterZodType = typeof authSchemas.register;
export type AuthLoginZodType = typeof authSchemas.login;

export type AuthRegisterWithBody = z.infer<AuthRegisterZodType>;
export type AuthLoginTypeWithBody = z.infer<AuthLoginZodType>;

export type AuthRegisterType = AuthRegisterWithBody['body'];
export type AuthLoginType = AuthLoginTypeWithBody['body'];

export type AuthSucceeded = AuthDocument & {
  _id: Types.ObjectId;
};

export type AuthSucceededWithoutPassword = Omit<
  AuthRegisterType,
  'password'
> & {
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
};

export interface AuthDocument extends Document, AuthRegisterType {}
export interface AuthModel extends Model<AuthDocument> {}
