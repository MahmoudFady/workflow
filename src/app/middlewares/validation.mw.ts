import { NextFunction } from "express";
import validation from "../validation/index.validation";
import ApiError from "../utils/error.util";
import joiSchema from "../types/joi-schema.type";

export default (next: NextFunction, ...input: [joiSchema, any][]) => {
  for (let [schema, target] of input) {
    const { error } = validation(schema, target);

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      throw new ApiError(errorMessage, 409);
    }
  }
  next();
};
