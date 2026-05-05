// controllers/boardController.js
// Route handlers for Board endpoints

const boardService = require('../services/boardService');

/**
 * GET /api/boards
 * Response 200: { success: true, boards }
 */
const getBoards = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const boards = await boardService.getBoards(userId);
    return res.status(200).json({ success: true, boards });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/boards
 * Body: { name, description? }
 * Response 201: { success: true, board }
 */
const createBoard = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const board = await boardService.createBoard(userId, req.body);
    return res.status(201).json({ success: true, board });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/boards/:id/invite
 * Body: { email }
 * Response 200: { success: true, board }
 */
const inviteMember = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { email } = req.body;
    const board = await boardService.inviteMember(req.params.id, userId, email);
    return res.status(200).json({ success: true, board });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/boards/:id/members/:userId
 * Response 200: { success: true, board }
 */
const removeMember = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const board = await boardService.removeMember(req.params.id, userId, req.params.userId);
    return res.status(200).json({ success: true, board });
  } catch (err) {
    next(err);
  }
};

module.exports = { getBoards, createBoard, inviteMember, removeMember };
