// services/boardService.js
// Business logic for Board operations

const Board = require('../models/Board');
const User = require('../models/User');

/**
 * Create a new board, setting the creator as owner and adding them to members.
 *
 * @param {string} ownerId
 * @param {object} boardData - { name, description? }
 * @returns {Board}
 */
const createBoard = async (ownerId, boardData) => {
  const board = await Board.create({
    ...boardData,
    ownerId,
    members: [{ userId: ownerId, role: 'owner' }],
  });
  return board;
};

/**
 * Get all boards where the user is the owner or a member.
 *
 * @param {string} userId
 * @returns {Board[]}
 */
const getBoards = async (userId) => {
  const boards = await Board.find({
    $or: [
      { ownerId: userId },
      { 'members.userId': userId },
    ],
  }).sort({ createdAt: -1 });
  return boards;
};

/**
 * Get a single board by ID, checking membership.
 * Throws 404 if not found, 403 if user is not a member.
 *
 * @param {string} boardId
 * @param {string} userId
 * @returns {Board}
 */
const getBoardById = async (boardId, userId) => {
  const board = await Board.findById(boardId);

  if (!board) {
    const err = new Error('Board tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }

  if (!board.isMember(userId)) {
    const err = new Error('Akses ditolak');
    err.statusCode = 403;
    throw err;
  }

  return board;
};

/**
 * Invite a user to a board by email. Only the owner can invite.
 * Throws 403 if requester is not owner, 404 if email not found,
 * 409 if user is already a member.
 *
 * @param {string} boardId
 * @param {string} ownerId - ID of the user performing the invite
 * @param {string} email - Email of the user to invite
 * @returns {Board}
 */
const inviteMember = async (boardId, ownerId, email) => {
  const board = await Board.findById(boardId);

  if (!board) {
    const err = new Error('Board tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }

  if (!board.isOwner(ownerId)) {
    const err = new Error('Hanya pemilik board yang dapat mengundang anggota');
    err.statusCode = 403;
    throw err;
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    const err = new Error('Pengguna dengan email tersebut tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }

  if (board.isMember(user._id)) {
    const err = new Error('Pengguna sudah menjadi anggota board');
    err.statusCode = 409;
    throw err;
  }

  board.members.push({ userId: user._id, role: 'member' });
  await board.save();

  return board;
};

/**
 * Remove a member from a board. Only the owner can remove members.
 * Throws 403 if requester is not owner, 400 if trying to remove the owner.
 *
 * @param {string} boardId
 * @param {string} ownerId - ID of the user performing the removal
 * @param {string} targetUserId - ID of the user to remove
 * @returns {Board}
 */
const removeMember = async (boardId, ownerId, targetUserId) => {
  const board = await Board.findById(boardId);

  if (!board) {
    const err = new Error('Board tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }

  if (!board.isOwner(ownerId)) {
    const err = new Error('Hanya pemilik board yang dapat mengeluarkan anggota');
    err.statusCode = 403;
    throw err;
  }

  if (board.isOwner(targetUserId)) {
    const err = new Error('Pemilik board tidak dapat dikeluarkan');
    err.statusCode = 400;
    throw err;
  }

  board.members = board.members.filter(
    (m) => m.userId.toString() !== targetUserId.toString()
  );
  await board.save();

  return board;
};

module.exports = { createBoard, getBoards, getBoardById, inviteMember, removeMember };
