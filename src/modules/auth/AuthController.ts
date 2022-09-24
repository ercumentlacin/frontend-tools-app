import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import expressAsyncHandler from 'express-async-handler';

import type {
  AuthLoginType,
  AuthRegisterType,
  AuthSucceeded,
  AuthSucceededWithoutPassword,
} from './interface';
import type HandlerType from '@/interfaces/HandlerType';

import AppError from '@/utils/AppError';
import AuthService from './AuthService';
import validate from '@/middlewares/validate';
import * as authSchemas from './authSchemas';

export default class AuthController {
  public router: Router;
  static ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

  public constructor(public readonly authService_: AuthService) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/register',
      validate(authSchemas.register),
      expressAsyncHandler(this.register)
    );
    this.router.post(
      '/login',
      validate(authSchemas.login),
      expressAsyncHandler(this.login)
    );
  }

  private readonly register: HandlerType<
    AuthSucceededWithoutPassword,
    AuthRegisterType
  > = async (req, res) => {
    const auth = await this.authService_.register(req.body);

    if (!(auth instanceof AppError)) {
      res.status(StatusCodes.CREATED).json({
        success: true,
        data: auth,
      });
    }
  };

  private readonly login: HandlerType<AuthSucceeded | string, AuthLoginType> =
    async (req, res) => {
      const auth = await this.authService_.login(req.body);
      if (typeof auth === 'string') {
        res.cookie('token', auth, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: AuthController.ONE_WEEK,
        });
      }

      res.status(StatusCodes.OK).json({
        success: true,
        data: auth,
      });
    };
}
