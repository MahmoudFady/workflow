// Custom decorator to add additional attributes to columns
function CustomColumn(options: {
  label?: string;
  control?: string;
  controlType?: string;
  placeholder?: string;
  values?: string[];
  validation?: { [key: string]: any };
  type?: string;
  required?: boolean;
}) {
  return function (target: Object, propertyName: string) {
    Reflect.defineMetadata(
      "customColumnOptions",
      options,
      target,
      propertyName
    );
  };
}

export default CustomColumn;
