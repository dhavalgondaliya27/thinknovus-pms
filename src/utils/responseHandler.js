const STATUS_CODES = require('./constants').STATUS_CODES;

class ResponseHandler {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  sender(code, data, message, error) {
    const isSuccess = code >= 200 && code < 300;
    const response = {
      statusCode: code,
      data: data || null,
      message: message || '',
      success: isSuccess,
    };

    this.res.status(code).json(response);

    if (error) {
      // HANDLE LOGS AND OTHER STUFF
      console.error('ResponseHandler -> sender -> error', error);
      // You can integrate a logging service here if needed
    }
  }

  custom(...args) {
    this.sender(...args);
  }

  // 2XX SUCCESS
  success(data, message) {
    this.sender(STATUS_CODES.SUCCESS, data, message);
  }

  created(data, message) {
    this.sender(STATUS_CODES.CREATED, data, message);
  }

  noContent(message = 'No content available') {
    this.sender(STATUS_CODES.NO_CONTENT, null, message);
  }

  // 4XX CLIENT ERROR
  badRequest(message = 'Request line contained invalid characters.', data, error) {
    this.sender(STATUS_CODES.BAD_REQUEST, data, message, error);
  }

  unauthorized(message = 'You are not authorized to access.', data, error) {
    this.sender(STATUS_CODES.UNAUTHORIZED, data, message, error);
  }

  forbidden(message = 'Access denied.', data, error) {
    this.sender(STATUS_CODES.FORBIDDEN, data, message, error);
  }

  alreadyReported(message = 'Already Reported', data, error) {
    this.sender(STATUS_CODES.ALREADY_REPORTED, data, message, error);
  }

  notValidEmail(message = 'Please use a valid email!', data, error) {
    this.sender(STATUS_CODES.UNPROCESSABLE_ENTITY, data, message, error);
  }

  notFound(message = 'Resource associated with the request could not be found.', data, error) {
    this.sender(STATUS_CODES.NOT_FOUND, data, message, error);
  }

  conflict(message = 'Provided information already exists!', data, error) {
    this.sender(STATUS_CODES.CONFLICT, data, message, error);
  }

  preconditionFailed(message = 'Please complete other steps first', data, error) {
    this.sender(STATUS_CODES.PRECONDITION_FAILED, data, message, error);
  }

  validationError(message = 'Validation error!', data, error) {
    this.sender(STATUS_CODES.VALIDATION_ERROR, data, message, error);
  }

  // 5XX SERVER ERROR
  serverError(error, message = 'Request failed due to an internal error.', data = null) {
    if (error && error.name === 'ValidationError') {
      return this.validationError(error.message, null, error);
    }

    this.sender(STATUS_CODES.SERVER_ERROR, data, message, error);
  }
}

module.exports = ResponseHandler;
