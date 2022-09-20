import { StatusCodes } from 'http-status-codes';

export default class AppError extends Error {
  constructor(
    public readonly name: string,
    public readonly httpCode: StatusCodes,
    public readonly details: unknown
  ) {
    super(name);
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this);
  }
}
