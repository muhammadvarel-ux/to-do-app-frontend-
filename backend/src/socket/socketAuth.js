const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

/**
 * Socket.io middleware for JWT authentication.
 * Extracts the token from socket.handshake.query.token,
 * verifies it, and sets socket.userId on success.
 *
 * @param {import('socket.io').Socket} socket
 * @param {Function} next
 */
const socketAuth = (socket, next) => {
  const token = socket.handshake.query.token;

  if (!token) {
    return next(new Error('Authentication error'));
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    socket.userId = decoded.userId;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
};

module.exports = socketAuth;
