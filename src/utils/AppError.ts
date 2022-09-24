import { StatusCodes } from 'http-status-codes';

interface AppErrorType<TDetails> {
  name: string;
  httpCode: StatusCodes;
  details: TDetails;
}

export default class AppError<T> extends Error implements AppErrorType<T> {
  constructor(
    public readonly name: string,
    public readonly httpCode: StatusCodes,
    public readonly details: T
  ) {
    super(name);
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this);
  }
}
