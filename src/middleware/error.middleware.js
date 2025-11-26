const ErrorHandling = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message,
    errName: err.name,
    // stack: err.stack,
  });
};

export default ErrorHandling;

// const errorHandler = (err, req, res, next) => {
//   const statusCode = err.statusCode || 500;

//   res.status(statusCode).json({
//     message: err.message || "Internal Server Error",
//     errName: err.name || "UnknownError",
//   });
// };

// export default errorHandler;
