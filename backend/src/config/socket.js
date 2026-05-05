const { Server } = require('socket.io');

/**
 * Initialize Socket.io server with CORS configuration.
 * @param {import('http').Server} httpServer - The HTTP server instance
 * @returns {import('socket.io').Server} The Socket.io server instance
 */
const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  return io;
};

module.exports = initSocket;
