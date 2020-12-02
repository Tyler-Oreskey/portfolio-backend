class ErrorHandler extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode || 404;
      this.message = message || 'An Error Occurred';
    }
  };
  
  const handleError = (err, res) => {
    let { statusCode, message } = err;

    if (statusCode === undefined) {
      statusCode = 404;
    }

    if (message === undefined) {
      message = 'An Error Occurred!';
    }

    res.status(statusCode, message).json({
      status: 'error',
      statusCode,
      message
    });
  };
  
  module.exports = { ErrorHandler, handleError };