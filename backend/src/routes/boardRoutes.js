// routes/boardRoutes.js
// Board endpoints — all routes protected by authMiddleware

const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const {
  getBoards,
  createBoard,
  inviteMember,
  removeMember,
} = require('../controllers/boardController');

// All board routes require authentication
router.use(authMiddleware);

// GET /api/boards
router.get('/', getBoards);

// POST /api/boards
router.post('/', createBoard);

// POST /api/boards/:id/invite
router.post('/:id/invite', inviteMember);

// DELETE /api/boards/:id/members/:userId
router.delete('/:id/members/:userId', removeMember);

module.exports = router;
