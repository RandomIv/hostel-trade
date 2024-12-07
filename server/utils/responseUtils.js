export const sendResponse = (res, statusCode, data, message = '') => {
  res.status(statusCode).json({
    status: statusCode >= 400 ? 'error' : 'success',
    message,
    data,
  });
};

export const handleServiceError = (next, error) => {
  if (error) {
    return next(error); // Передаємо помилку до глобального обробника
  }
};
