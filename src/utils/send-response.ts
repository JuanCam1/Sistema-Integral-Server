import type { StatusModel } from "types/status.model";

export interface StandardResponse<T> {
  data: T;
  message: string;
  state: StatusModel;
  codeError?: string;
}

export const sendResponse = <T>(
  data: T,
  message: string,
  state: StatusModel,
  codeError?: string,
): StandardResponse<T> => {
  return {
    data,
    message,
    state,
    ...(codeError && { codeError }),
  };
};
