// src/common/response.ts

import { Context } from 'koa';

export enum StatusCode {
  Success = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  ServerError = 500,
}

interface ResponseData {
  status: StatusCode;
  message?: string;
  data?: unknown;
}

export const sendResponse = (ctx: Context, data: ResponseData): void => {
  const { status, message, data: responseData } = data;

  const response: ResponseData = {
    status,
  };

  if (message) {
    response.message = message;
  }

  if (responseData) {
    response.data = responseData;
  }

  ctx.status = status;
  ctx.body = response;
};

