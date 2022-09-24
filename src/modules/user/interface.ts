import { Document, Model, Types } from 'mongoose';
import z from 'zod';

import * as userSchemas from './userSchemas';

export type UserZodType = typeof userSchemas.user;
export type UserPatchZodType = typeof userSchemas.userPatch;

export type UserWithBody = z.infer<UserZodType>;
export type UserPatchTypeWithBody = z.infer<UserPatchZodType>;

export type UserType = UserWithBody['body'];
export type PatchType = UserPatchTypeWithBody['body'];

export type UserSucceeded = UserDocument & {
  _id: Types.ObjectId;
};

export type UserSucceededWithoutPassword = Omit<UserType, 'password'> & {
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
};

export interface UserDocument extends Document, UserType {}
export interface UserModel extends Model<UserDocument> {}
