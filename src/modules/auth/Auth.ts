import { Schema, model } from 'mongoose';
import type { AuthDocument, AuthModel } from './interface';

const authSchema = new Schema<AuthDocument, AuthModel>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: String,
});

const Auth = model<AuthDocument, AuthModel>('Auth', authSchema);

export default Auth;
