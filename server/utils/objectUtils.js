export const toSnakeCase = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;

  return JSON.parse(
    JSON.stringify(obj)
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase(),
  );
};
