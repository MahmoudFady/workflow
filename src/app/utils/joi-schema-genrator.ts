import * as Joi from "joi";
export default (fields: { [key: string]: any }[] | any) => {
  let JoiSchema: { [key: string]: any } = {};
  for (let { options, name, type } of fields) {
    if (options.type !== "file") {
      let fieldSchema =
        Joi[type]()[options.required ? "required" : "optional"]();
      if (options.controlType === "email") {
        fieldSchema = fieldSchema.email();
      }
      if (options.validation) {
        for (let k in options.validation) {
          if (typeof fieldSchema[k] === "function") {
            if (k === "valid") {
              fieldSchema = fieldSchema.valid(...options.validation[k]);
            } else {
              fieldSchema = fieldSchema[k](options.validation[k]);
            }
          }
        }
      }

      JoiSchema[name] = fieldSchema;
    }
  }

  return Joi.object(JoiSchema);
};
