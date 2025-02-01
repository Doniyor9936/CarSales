class BaseError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }

  static BadRequest(message) {
    return new BaseError(400, message);
  }

  static NotFound(message) {
    return new BaseError(404, message);
  }

  static InternalError(message) {
    return new BaseError(500, message);
  }
}

module.exports = BaseError;
