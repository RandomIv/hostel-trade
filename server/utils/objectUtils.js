export const toSnakeCase = (obj) => {
  return JSON.parse(
    JSON.stringify(obj)
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase(),
  );
};
