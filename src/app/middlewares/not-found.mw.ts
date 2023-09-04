import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/error.util";

export default (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError("not found endpoint", 404));
};
