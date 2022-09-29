import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  Router,
} from 'express';
import ToolService from './ToolService';
import validate from '@/middlewares/validate';
import validateAll from '@/middlewares/validateAll';
import * as middlewares from './ToolMiddleware';
import verifyToken from '@/middlewares/verifyToken';
import RequestWithUser from '@/interfaces/RequestWithUser';

export default class TodoController {
  public router = Router();
  public constructor(public service: ToolService) {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get('/', this.getAll);
    this.router.get('/:id', validate(middlewares.id), this.getById);
    this.router.post(
      '/',
      verifyToken,
      validate(middlewares.create),
      this.create
    );
    this.router.put(
      '/:id',
      validateAll([middlewares.id, middlewares.update]),
      this.update
    );
    this.router.delete('/:id', validate(middlewares.id), this.delete);
    this.router.get('/search', this.search);
    this.router.delete('/', this.deleteAll);
  }

  public getAll: RequestHandler = expressAsyncHandler(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const result = await this.service.getAll();
      res.status(StatusCodes.OK).json(result);
    }
  );

  public getById: RequestHandler = expressAsyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = req.params;
      const result = await this.service.getById(id);
      res.status(StatusCodes.OK).json(result);
    }
  );

  public search: RequestHandler = expressAsyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { tag } = req.query;
      const result = await this.service.search(tag as string);
      res.status(StatusCodes.OK).json(result);
    }
  );

  public create: RequestHandler = expressAsyncHandler(
    async (req: RequestWithUser, res: Response, _next: NextFunction) => {
      let userId;
      if (typeof req.user === 'string') {
        userId = req.user;
      }
      if (typeof req.user === 'object') {
        userId = req.user.id;
      }
      const result = await this.service.create({ ...req.body, userId });
      res.status(StatusCodes.CREATED).json(result);
    }
  );

  public update: RequestHandler = expressAsyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = req.params;
      const result = await this.service.updateOne(id, req.body);
      res.status(StatusCodes.OK).json(result);
    }
  );

  public delete: RequestHandler = expressAsyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = req.params;
      await this.service.deleteOne(id);
      res.status(StatusCodes.NO_CONTENT).send();
    }
  );

  public deleteAll: RequestHandler = expressAsyncHandler(
    async (_req: Request, res: Response, _next: NextFunction) => {
      await this.service.deleteAll();
      res.status(StatusCodes.NO_CONTENT).send();
    }
  );
}
