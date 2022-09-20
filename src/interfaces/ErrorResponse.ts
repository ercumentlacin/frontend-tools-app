import ResponseType from './ResponseType';

export default interface ErrorResponse extends ResponseType<undefined> {
  stack?: string;
  message: string;
  details?: unknown;
}
