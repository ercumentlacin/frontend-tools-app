import { ResponseType } from './ResponseType';

export type ErrorResponse<T = undefined> = ResponseType<T> & {
  stack?: string;
  details?: unknown;
};
