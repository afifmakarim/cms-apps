const errorHandler = (HTTPCODE, ERROR) => {
  if (HTTPCODE === 401) {
    return ERROR.response.data.message;
  }
  if (HTTPCODE === 500) {
    return "Internal Server Error";
  }
  return "General Error";
};

export { errorHandler };
