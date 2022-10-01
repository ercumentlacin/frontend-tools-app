import AppError from '@/utils/AppError';
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ErrorResponse } from '../interfaces/ErrorResponse';

export function notFound(req: Request, res: Response, next: NextFunction) {
  const error = new AppError(
    `🔍 - Not Found - ${req.originalUrl}`,
    StatusCodes.NOT_FOUND,
    null
  );
  next(error);
}

export function errorHandler(
  err: Error | AppError<unknown>,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let details = err.message;

  if (err instanceof AppError) {
    statusCode = err.httpCode;
    details = err.details;
  }

  const stack = process.env.NODE_ENV === 'production' ? '🥞' : err.stack;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack,
    details,
  });
}
