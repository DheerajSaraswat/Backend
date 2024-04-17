class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    errorStack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.success = false
    this.errors = errors;
    if (errorStack) {
      this.errorStack = errorStack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}


export {ApiError}