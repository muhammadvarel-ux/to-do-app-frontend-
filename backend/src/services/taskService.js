// services/taskService.js
// Business logic for Task CRUD operations

const Task = require('../models/Task');

/**
 * Get all tasks for a user, with optional filters.
 *
 * @param {string} userId
 * @param {object} query - Optional filters: { status, boardId }
 * @returns {Task[]}
 */
const getTasks = async (userId, query = {}) => {
  const filter = { userId };

  if (query.status) {
    filter.status = query.status;
  }

  if (query.boardId) {
    filter.boardId = query.boardId;
  }

  const tasks = await Task.find(filter).sort({ order: 1, createdAt: -1 });
  return tasks;
};

/**
 * Create a new task for a user.
 *
 * @param {string} userId
 * @param {object} taskData - { title, description, deadline, category, boardId, order }
 * @returns {Task}
 */
const createTask = async (userId, taskData) => {
  const task = await Task.create({ ...taskData, userId });
  return task;
};

/**
 * Get a single task by ID, checking ownership.
 * Throws 404 if not found, 403 if not owned by userId.
 *
 * @param {string} taskId
 * @param {string} userId
 * @returns {Task}
 */
const getTaskById = async (taskId, userId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    const err = new Error('Task tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }

  if (task.userId.toString() !== userId.toString()) {
    const err = new Error('Akses ditolak');
    err.statusCode = 403;
    throw err;
  }

  return task;
};

/**
 * Update a task by ID, checking ownership.
 * Throws 404 if not found, 403 if not owned by userId.
 *
 * @param {string} taskId
 * @param {string} userId
 * @param {object} updateData
 * @returns {Task}
 */
const updateTask = async (taskId, userId, updateData) => {
  const task = await Task.findById(taskId);

  if (!task) {
    const err = new Error('Task tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }

  if (task.userId.toString() !== userId.toString()) {
    const err = new Error('Akses ditolak');
    err.statusCode = 403;
    throw err;
  }

  // Apply updates
  const allowedFields = ['title', 'description', 'deadline', 'category', 'status', 'order', 'boardId'];
  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      task[field] = updateData[field];
    }
  });

  await task.save();
  return task;
};

/**
 * Delete a task by ID, checking ownership.
 * Throws 404 if not found, 403 if not owned by userId.
 *
 * @param {string} taskId
 * @param {string} userId
 * @returns {Task} The deleted task
 */
const deleteTask = async (taskId, userId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    const err = new Error('Task tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }

  if (task.userId.toString() !== userId.toString()) {
    const err = new Error('Akses ditolak');
    err.statusCode = 403;
    throw err;
  }

  await task.deleteOne();
  return task;
};

module.exports = { getTasks, createTask, getTaskById, updateTask, deleteTask };
