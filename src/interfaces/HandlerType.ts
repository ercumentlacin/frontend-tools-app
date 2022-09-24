import { RequestHandler } from 'express';
import { ErrorResponse } from './ErrorResponse';
import { ResponseType } from './ResponseType';

type HandlerType<ResponseType_, RequestType> = RequestHandler<
  {},
  ErrorResponse | ResponseType<ResponseType_>,
  RequestType
>;

export default HandlerType;
