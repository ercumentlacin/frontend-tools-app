import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import type { AuthDocument, AuthModel } from './interface';

const authSchema = new Schema<AuthDocument, AuthModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

authSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const Auth = model<AuthDocument, AuthModel>('Auth', authSchema);

export default Auth;
