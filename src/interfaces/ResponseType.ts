export default interface ResponseType<T> {
  success: boolean;
  data?: T | undefined;
}
