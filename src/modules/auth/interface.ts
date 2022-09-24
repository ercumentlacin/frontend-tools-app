import { Document, Model, Types } from 'mongoose';
import z from 'zod';

import * as authSchemas from './authSchemas';

export type AuthRegisterZodType = typeof authSchemas.register;
export type AuthLoginZodType = typeof authSchemas.login;

export type AuthRegisterWithBody = z.infer<typeof authSchemas.register>;
export type AuthLoginTypeWithBody = z.infer<typeof authSchemas.login>;

export type AuthRegisterType = AuthRegisterWithBody['body'];
export type AuthLoginType = AuthLoginTypeWithBody['body'];

export type AuthSucceeded = AuthDocument & {
  _id: Types.ObjectId;
};
export interface AuthDocument extends Document, AuthRegisterType {}
export interface AuthModel extends Model<AuthDocument> {}
