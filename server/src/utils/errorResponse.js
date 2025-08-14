class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Maintains proper stack trace for where our error was thrown (only available in V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorResponse);
    }

    this.name = this.constructor.name;
  }

  static badRequest(message = 'Bad Request') {
    return new ErrorResponse(message, 400);
  }

  static unauthorized(message = 'Unauthorized') {
    return new ErrorResponse(message, 401);
  }

  static forbidden(message = 'Forbidden') {
    return new ErrorResponse(message, 403);
  }

  static notFound(message = 'Resource not found') {
    return new ErrorResponse(message, 404);
  }

  static conflict(message = 'Conflict') {
    return new ErrorResponse(message, 409);
  }

  static unprocessable(message = 'Unprocessable Entity') {
    return new ErrorResponse(message, 422);
  }

  static serverError(message = 'Internal Server Error') {
    return new ErrorResponse(message, 500);
  }
}

module.exports = ErrorResponse;
