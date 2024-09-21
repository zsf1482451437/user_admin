class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }

  static handleError(error, message = "") {
    if (error instanceof ErrorHandler) {
      return {
        message: message || error.message,
        statusCode: error.statusCode,
      };
    } else {
      return {
        message: "服务器错误",
        statusCode: 500,
      };
    }
  }
}

module.exports = ErrorHandler;
