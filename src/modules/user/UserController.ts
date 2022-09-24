import { RequestHandler, Response, Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import RequestWithUser from '@/interfaces/RequestWithUser';
import { StatusCodes } from 'http-status-codes';
import AuthService from '../auth/AuthService';

import verifyToken from '@/middlewares/verifyToken';
import { validateMe } from './userMiddlewares';

export default class UserController {
  public router: Router;

  public constructor(public readonly authService_: AuthService) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.findMany);
    this.router.get('/:id', this.findOne);
    this.router.get(
      '/me',
      verifyToken,
      validateMe,
      expressAsyncHandler(this.me)
    );
    this.router.put(
      '/:id',
      verifyToken,
      validateMe,
      expressAsyncHandler(this.updateOne)
    );
    this.router.put(
      '/me',
      verifyToken,
      validateMe,
      expressAsyncHandler(this.updateOne)
    );
    this.router.delete(
      '/me',
      verifyToken,
      validateMe,
      expressAsyncHandler(this.deleteOne)
    );
  }

  private readonly findMany: RequestHandler = async (req, res) => {
    const docs = await this.authService_.findMany();
    res.status(StatusCodes.OK).json({
      success: true,
      data: docs,
    });
  };

  private readonly findOne: RequestHandler = async (req, res) => {
    const doc = await this.authService_.findOne(req.params.id);
    res.status(StatusCodes.OK).json({
      success: true,
      data: doc,
    });
  };

  private readonly updateOne: RequestHandler = async (req, res) => {
    const doc = await this.authService_.updateOne(req.params.id, req.body);
    res.status(StatusCodes.OK).json({
      success: true,
      data: doc,
    });
  };

  private readonly deleteOne: RequestHandler = async (req, res) => {
    const doc = await this.authService_.deleteOne(req.params.id);
    res.status(StatusCodes.OK).json({
      success: true,
      data: doc,
    });
  };

  private readonly me = async (req: RequestWithUser, res: Response) => {
    const doc = await this.authService_.me(req.user as string);
    res.status(StatusCodes.OK).json({
      success: true,
      data: doc,
    });
  };
}
