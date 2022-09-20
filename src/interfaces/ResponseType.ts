interface Success {
  success: boolean;
}

type SuccessWithData<T> = Success & {
  data?: T | undefined;
};

type SuccessWithMessage = Success & {
  message: string;
};

export type ResponseType<T = undefined> = T extends undefined
  ? SuccessWithMessage
  : SuccessWithData<T>;
