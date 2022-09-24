import { Response, NextFunction, Request } from 'express';
import AppError from '@/utils/AppError';
import { StatusCodes } from 'http-status-codes';
import * as password from '@/utils/password';
import Auth from '../auth/Auth';
import { AuthSucceeded } from '../auth/interface';

export async function validateAuth(
  req: Request<{}, {}, { email: string; password: string }> & {
    user?: AuthSucceeded;
  },
  _res: Response,
  next: NextFunction
) {
  const { email, password: password_ } = req.body;
  if ([email, password_].some((v) => typeof v !== 'string')) {
    return next(
      new AppError(
        'Invalid email or password',
        StatusCodes.UNPROCESSABLE_ENTITY,
        null
      )
    );
  }
  const user = await Auth.findOne({ email });
  if (user === null) {
    return next(
      new AppError(
        'Invalid email or password',
        StatusCodes.UNPROCESSABLE_ENTITY,
        null
      )
    );
  }
  const isValid = await password.comparePassword(password_, user.password);
  if (!isValid) {
    return next(
      new AppError(
        'Invalid email or password',
        StatusCodes.UNPROCESSABLE_ENTITY,
        null
      )
    );
  }
  req.user = user;
  next();
}

export async function validateMe(
  req: Request & { user?: ReturnType<typeof password.verifyToken> },
  _res: Response,
  next: NextFunction
) {
  const { token } = req.cookies as { token: string | undefined };
  if (token === undefined) {
    return next(new AppError('Unauthorized', StatusCodes.UNAUTHORIZED, null));
  }
  try {
    const verified = password.verifyToken(token);
    req.user = verified;
    next();
  } catch (err) {
    next(new AppError('Invalid Token', StatusCodes.UNAUTHORIZED, null));
  }
}
