function formatError(err) {
  return {
    code: err.code,
    message: err.message,
  };
}

function formatAPIResponse(
  response,
  { status, message = '', datas = {}, error = {} },
) {
  const isSuccess = (status) => {
    return !(status >= 400 && status < 600);
  };

  const responseJson = {
    success: isSuccess(status),
    message: message,
    datas: isSuccess(status) ? datas : null,
  };

  if (!isSuccess(status)) {
    responseJson.error = formatError(error);
  }

  return response.status(status).json(responseJson);
}

module.exports = {
  formatAPIResponse,
  formatError,
};
