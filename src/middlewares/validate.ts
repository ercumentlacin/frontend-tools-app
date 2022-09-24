import { RequestHandler } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import AppError from '@/utils/AppError';

const validate = <T extends AnyZodObject>(schema: T): RequestHandler => {
  return async (req, _res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error: ZodError | Error | unknown) {
      console.log('validateError :>> ', error);
      if (error instanceof ZodError) {
        return next(
          new AppError(
            'ValidationError',
            StatusCodes.BAD_REQUEST,
            error.errors.map((error) => ({
              path: error.path.join('.'),
              message: error.message,
            }))
          )
        );
      }
      return next(error);
    }
  };
};

export default validate;
