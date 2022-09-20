import 'dotenv/config';
import type { Application } from 'express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import * as middlewares from './middlewares';
import { ResponseType } from './interfaces/ResponseType';

export default class App {
  public app: Application;

  public constructor() {
    this.app = express();
    this.initializeMiddleware();
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
  }

  private initializeMiddleware() {
    this.app
      .use(morgan('dev'))
      .use(helmet())
      .use(cors())
      .use(express.json())
      .use(express.urlencoded({ extended: true }));
  }

  private errorHandler() {
    this.app.use(middlewares.notFound).use(middlewares.errorHandler);
  }
}

export const { app } = new App();
