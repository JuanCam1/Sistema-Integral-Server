import { Response } from "express";
import type { StatusModel } from "types/status.model";

export const sendResponse = <T>(
  data: T,
  message: string,
  state: StatusModel,
  res: Response,
  code: number,
) => {
  return res.status(code).json({
    data,
    message,
    state,
    code,
  });
};
