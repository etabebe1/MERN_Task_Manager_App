class CustomApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return CustomApiError(msg, statusCode);
};

module.exports = { createCustomError, CustomApiError };
