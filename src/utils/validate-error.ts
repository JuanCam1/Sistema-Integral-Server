import {
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  RequestTimeoutException,
  MethodNotAllowedException,
  PayloadTooLargeException,
  UnsupportedMediaTypeException,
  UnprocessableEntityException,
  InternalServerErrorException,
  ServiceUnavailableException,
  GatewayTimeoutException,
  HttpException,
} from "@nestjs/common";
import { sendResponse } from "./send-response";
import { StatusModel } from "types/status.model";
import { Response } from "express";
import { HttpCode } from "./http-code";

export const validateError = (error: any, res: Response) => {
  if (error instanceof NotFoundException) {
    return sendResponse(
      null,
      error.message || "Not Found",
      StatusModel.ERROR,
      res,
      HttpCode.NOT_FOUND,
    );
  }

  if (error instanceof BadRequestException) {
    return sendResponse(
      null,
      error.message || "Bad Request",
      StatusModel.ERROR,
      res,
      HttpCode.BAD_REQUEST,
    );
  }

  if (error instanceof UnauthorizedException) {
    return sendResponse(
      null,
      error.message || "Unauthorized",
      StatusModel.ERROR,
      res,
      HttpCode.UNAUTHORIZED,
    );
  }

  if (error instanceof ForbiddenException) {
    return sendResponse(
      null,
      error.message || "Forbidden",
      StatusModel.ERROR,
      res,
      HttpCode.FORBIDDEN,
    );
  }

  if (error instanceof ConflictException) {
    return sendResponse(
      null,
      error.message || "Conflict",
      StatusModel.ERROR,
      res,
      HttpCode.CONFLICT,
    );
  }

  if (error instanceof RequestTimeoutException) {
    return sendResponse(
      null,
      error.message || "Request Timeout",
      StatusModel.ERROR,
      res,
      HttpCode.REQUEST_TIMEOUT,
    );
  }

  if (error instanceof MethodNotAllowedException) {
    return sendResponse(
      null,
      error.message || "Method Not Allowed",
      StatusModel.ERROR,
      res,
      HttpCode.METHOD_NOT_ALLOWED,
    );
  }

  if (error instanceof PayloadTooLargeException) {
    return sendResponse(
      null,
      error.message || "Payload Too Large",
      StatusModel.ERROR,
      res,
      HttpCode.PAYLOAD_TOO_LARGE,
    );
  }

  if (error instanceof UnsupportedMediaTypeException) {
    return sendResponse(
      null,
      error.message || "Unsupported Media Type",
      StatusModel.ERROR,
      res,
      HttpCode.UNSUPPORTED_MEDIA_TYPE,
    );
  }

  if (error instanceof UnprocessableEntityException) {
    return sendResponse(
      null,
      error.message || "Unprocessable Entity",
      StatusModel.ERROR,
      res,
      HttpCode.UNPROCESSABLE_ENTITY,
    );
  }

  if (error instanceof InternalServerErrorException) {
    return sendResponse(
      null,
      error.message || "Internal Server Error",
      StatusModel.ERROR,
      res,
      HttpCode.INTERNAL_SERVER_ERROR,
    );
  }

  if (error instanceof ServiceUnavailableException) {
    return sendResponse(
      null,
      error.message || "Service Unavailable",
      StatusModel.ERROR,
      res,
      HttpCode.SERVICE_UNAVAILABLE,
    );
  }

  if (error instanceof GatewayTimeoutException) {
    return sendResponse(null, "Gateway Timeout", StatusModel.ERROR, res, 504);
  }

  if (error instanceof HttpException) {
    return sendResponse(
      null,
      error.message || "HTTP Error",
      StatusModel.ERROR,
      res,
      error.getStatus?.() || 500,
    );
  }

  return sendResponse(
    null,
    "Internal Server Error",
    StatusModel.ERROR,
    res,
    500,
  );
};
