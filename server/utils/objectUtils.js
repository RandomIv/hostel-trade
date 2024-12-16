export const toSnakeCase = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const snakeKey = key.replace(
        /([A-Z])/g,
        (match) => `_${match.toLowerCase()}`,
      );
      return [snakeKey, value]; // Повертаємо ключ у snake_case, значення без змін
    }),
  );
};
