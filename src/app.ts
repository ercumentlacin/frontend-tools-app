import 'dotenv/config';
import type { Application } from 'express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import * as middlewares from './middlewares';
import { ResponseType } from './interfaces/ResponseType';
import connectToDb from './db/connectToDB';
import AuthRouter from './modules/auth/AuthRouter';
import UserRouter from './modules/user/UserRouter';
import ToolRouter from './modules/tool/ToolRouter';

export default class App {
  public app: Application;

  public constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.connectToDb();
    this.initializeRoutes();
    this.errorHandler();
  }

  private initializeRoutes() {
    this.app.get<{}, ResponseType<string>>('/', (req, res) => {
      res.json({
        success: true,
        data: 'Hello World!',
      });
    });
    this.app.use('/api/v1/auth', AuthRouter);
    this.app.use('/api/v1/user', UserRouter);
    this.app.use('/api/v1/tool', ToolRouter);
  }

  private initializeMiddleware() {
    this.app
      .use(morgan('dev'))
      .use(helmet())
      .use(cors())
      .use(express.json())
      .use(cookieParser())
      .use(express.urlencoded({ extended: true }));
  }

  private errorHandler() {
    this.app.use(middlewares.notFound).use(middlewares.errorHandler);
  }

  private connectToDb() {
    void connectToDb();
  }
}

export const { app } = new App();
