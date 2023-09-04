import * as Joi from "joi";
const fileSchema = Joi.binary().min(1).max(5242880).required();
export { fileSchema };
