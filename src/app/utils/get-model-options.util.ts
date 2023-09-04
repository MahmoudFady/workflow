import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
const getSchemaAttributes = (entity) => {
  const repository = AppDataSource.getRepository(entity);
  const entityMetadata = repository.metadata;
  const fields = entityMetadata.columns
    .filter((column) => column.propertyName !== "id")
    .map((column) => ({
      name: column.propertyName,
      type: column.type,
      options: column.entityMetadata.name,
      ...Reflect.getMetadata(
        "customColumnOptions",
        entity.prototype,
        column.propertyName
      ),
    }));

  const responseJSON = {
    attributes: fields.map((attribute) => ({
      name: attribute.name,
      type: attribute.type,
      options: {
        label: attribute.label,
        control: attribute.control,
        controlType: attribute.controlType,
        placeholder: attribute.placeholder,
        type: attribute.type,
        values: attribute.values,
        validation: attribute.validation,
        required: attribute.required,
      },
    })),
  };
  return responseJSON.attributes;
};

export default getSchemaAttributes;
