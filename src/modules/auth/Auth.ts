import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import type { AuthDocument, AuthModel } from './interface';

export const authSchema = new Schema<AuthDocument, AuthModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const hashPassword = function (
  this: AuthDocument & { _id: import('mongoose').Types.ObjectId },
  next: import('mongoose').CallbackWithoutResultAndOptionalError
): void {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
};
authSchema.pre('save', hashPassword);

const Auth = model<AuthDocument, AuthModel>('Auth', authSchema);

export default Auth;
