// middleware/errorHandler.js
// Global error handler middleware for Express
// Must be registered with 4 arguments: (err, req, res, next)

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Terjadi kesalahan internal server';

  // Mongoose ValidationError → HTTP 400
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({ success: false, errors });
  }

  // Mongoose duplicate key error (code 11000) → HTTP 409
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} sudah digunakan`;
  }

  // JWT errors → HTTP 401
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token tidak valid';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token kedaluwarsa';
  }

  // Mongoose CastError (invalid ObjectId) → HTTP 400
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'ID tidak valid';
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Include stack trace only in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
