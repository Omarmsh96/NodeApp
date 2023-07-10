//@desc this class is responsible about opertion errors (perdictable errors)

class ErrorApi extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error';
    }
  
    errorhandling(err, req, res, next) {
      err.statusCode = err.statusCode || 500;
      err.status = err.status || 'error';
      res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack // where the error happened
      });
    }
  }
  
  module.exports = ErrorApi;