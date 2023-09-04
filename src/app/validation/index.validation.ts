import joiSchema from "../types/joi-schema.type";
const joiSchmes = {};
export default (joiSchema: joiSchema, target: any) => {
  return joiSchmes[joiSchema]().validate(target);
};
