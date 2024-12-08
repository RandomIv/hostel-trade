export const sendResponse = (res, statusCode, data, message = '') => {
  res.status(statusCode).json({
    status: statusCode >= 400 ? 'error' : 'success',
    message,
    data,
  });
};
