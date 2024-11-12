const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
  console.log('frecferc');
  if (res.headersSent) {
    return next(err);
  }

  // Check if the error is an instance of ApiError and respond with formatted error
  if (err instanceof ApiError) {
    const errorResponse = err.getFormattedError();
    return res.status(err.statusCode).json(errorResponse);
  }

  // For unknown errors, return a generic response
  const unknownError = new ApiError(
    500,
    'Internal Server Error',
    [err.message],
    'unknown',
  );
  return res
    .status(unknownError.statusCode)
    .json(unknownError.getFormattedError());
};

module.exports = errorHandler;
