function formatResponse(data, status = "success", message = "") {
  return {
    data,
    status,
    message,
  };
}

module.exports = formatResponse;
