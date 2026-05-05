require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const initSocket = require('./config/socket');
const socketAuth = require('./socket/socketAuth');

const app = express();
const httpServer = http.createServer(app);

// ── Socket.io ─────────────────────────────────────────────────────────────────

const io = initSocket(httpServer);
io.use(socketAuth);
require('./socket/socketHandler')(io);

// ── Middleware ────────────────────────────────────────────────────────────────

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Feature routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/boards', require('./routes/boardRoutes'));

// ── Global error handler ──────────────────────────────────────────────────────

app.use(require('./middleware/errorHandler'));

// ── Start server ──────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

module.exports = { app, httpServer };
