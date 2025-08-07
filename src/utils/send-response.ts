import { Response } from "express";
import type { StatusModel } from "types/status.model";

export const sendResponse = <T>(
  data: T,
  message: string,
  state: StatusModel,
  res: Response,
  codeError: number,
) => {
  return res.status(codeError).json({
    data,
    message,
    state,
    codeError,
  });
};
