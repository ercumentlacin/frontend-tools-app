import { NextFunction, Request, Response } from 'express';

export function mockExpress() {
  const req = {} as unknown as Request;
  const res = {} as unknown as Response;
  const next = {} as unknown as NextFunction;

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.statusCode = 200;

  return {
    req,
    res,
    next,
  };
}
