import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/error.util";
import vars from "../config/variables.config";
export default (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message, statusCode } = error;
  res.locals.message = message;
  
  if (vars.NODE_ENV === "dev")
    res.status(statusCode).json({
      message,
    });
  res.status(500).json({
    message: "internal server error",
  });
};
