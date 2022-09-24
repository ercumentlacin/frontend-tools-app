import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

export async function hashPassword(password: string, salt: number = 10) {
  return await bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export function createToken<T extends string | object>(
  payload: T,
  secret: string,
  expiresIn: string = '2h'
) {
  return jsonwebtoken.sign(payload, secret, { expiresIn });
}

export function verifyToken(token: string, secret: string) {
  return jsonwebtoken.verify(token, secret);
}
