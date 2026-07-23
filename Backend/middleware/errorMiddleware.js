const errorMiddleware = (err, req, res, next) => {
  // Default status code
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Default message
  let message = err.message || "Internal Server Error";

  // Mongoose Invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found";
  }

  // Mongoose Duplicate Key
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // JWT Invalid Token
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  // JWT Expired Token
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired";
  }

  // Multer Error
  if (err.code === "LIMIT_FILE_SIZE") {
    statusCode = 400;
    message = "File size should not exceed 5 MB";
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack:
      process.env.NODE_ENV === "production"
        ? null
        : err.stack,
  });
};

module.exports = errorMiddleware;