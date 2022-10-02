import AppError from '@/utils/AppError';
import zod from 'zod';
import * as express from 'express';
import { StatusCodes } from 'http-status-codes';
import RequestWithUser from '@/interfaces/RequestWithUser';
import ToolModel from './ToolModel';

export const create = zod.object({
  body: zod.object({
    url: zod.string().url(),

    title: zod
      .string({
        required_error: 'Title is required',
      })
      .min(3, 'Title must be at least 3 character')
      .max(100, 'Title must be less than 100 characters'),

    description: zod.string({
      required_error: 'Description is required',
    }),

    tags: zod.array(zod.string()).min(1, 'Tags must be at least 1 character'),

    userId: zod.string().optional(),
  }),
});

export const update = zod.object({
  body: zod.object({
    url: zod.string().url(),

    title: zod
      .string({
        required_error: 'Title is required',
      })
      .min(3, 'Title must be at least 3 character')
      .max(100, 'Title must be less than 100 characters'),

    description: zod.string({
      required_error: 'Description is required',
    }),

    tags: zod.array(zod.string()).min(1, 'Tags must be at least 1 character'),

    userId: zod.string().optional(),
  }),
});

export const id = zod.object({
  params: zod.object({
    id: zod.string({
      required_error: 'ID is required',
    }),
  }),
});

export const search = zod.object({
  query: zod.object({
    q: zod.string({
      required_error: 'Query is required',
    }),
  }),
});

export const isToolCreator = async (
  req: RequestWithUser,
  _res: express.Response,
  next: express.NextFunction
) => {
  const { id } = req.params;

  const requestUserId = typeof req.user === 'string' ? req.user : req.user?.id;

  const tool = await ToolModel.findById(id);

  if (tool === null) {
    throw new AppError('Tool not found', StatusCodes.NOT_FOUND, null);
  }
  console.log(req.body.userId, requestUserId, tool.userId);
  if (req.body.userId !== tool.userId) {
    throw new AppError(
      'You are not authorized to perform this action',
      StatusCodes.UNAUTHORIZED,
      null
    );
  }

  next();
};
