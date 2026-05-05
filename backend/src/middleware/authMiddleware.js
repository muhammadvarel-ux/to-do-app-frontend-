const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

/**
 * JWT Authentication Middleware
 * Extracts and verifies JWT from Authorization header.
 * Sets req.user = { userId } if valid, otherwise returns HTTP 401.
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Token tidak ditemukan',
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token tidak ditemukan',
    });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token kedaluwarsa',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Token tidak valid',
    });
  }
};

module.exports = authMiddleware;
