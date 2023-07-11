const errorHandling = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
      errorDevMode(err, res);
    } else {
      errorProdMode(err, res);
    }
  };
  
  const errorDevMode = (err, res) => {
   return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack // where the error happened
    });
  };
  
  const errorProdMode = (err, res) => {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  };
  
  module.exports = errorHandling;