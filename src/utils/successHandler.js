function successHandler(data, statusCode = 200, message = "") {
  return {
    ...(data && { data }),
    statusCode,
    message,
  };
}

module.exports = successHandler;
