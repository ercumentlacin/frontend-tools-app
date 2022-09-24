import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jsonwebtoken from 'jsonwebtoken';

import RequestWithUser from '@/interfaces/RequestWithUser';
import AppError from '@/utils/AppError';

export default function verifyToken(
  req: RequestWithUser,
  _res: Response,
  next: NextFunction
) {
  const { token } = req.cookies as { token: string | undefined };
  if (token === undefined) {
    return next(new AppError('Unauthorized', StatusCodes.UNAUTHORIZED, null));
  }

  try {
    const verified = jsonwebtoken.verify(
      token,
      process.env.TOKEN_SECRET as string
    );
    req.user = verified;
    next();
  } catch (err) {
    next(new AppError('Invalid Token', StatusCodes.UNAUTHORIZED, null));
  }
}
