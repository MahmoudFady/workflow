import { Request, Response } from "express";
import httpResStatus from "../types/http-status-code.type";
import httpStatusCode from "../config/http-status-code.config";
export default (
  req: Request,
  res: Response,
  status: httpResStatus,
  message: string,
  result: { [key: string]: any } = null
) => {
  res.locals.message = message;
  res.locals.result = JSON.stringify(result);
  const statusCode = httpStatusCode[status] || res.statusCode;
  return res.status(statusCode).json({ message, result });
};
