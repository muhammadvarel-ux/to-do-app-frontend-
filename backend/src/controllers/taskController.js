// controllers/taskController.js
// Route handlers for Task CRUD endpoints

const taskService = require('../services/taskService');

/**
 * GET /api/tasks
 * Query: { status?, boardId? }
 * Response 200: { success: true, tasks }
 */
const getTasks = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const tasks = await taskService.getTasks(userId, req.query);
    return res.status(200).json({ success: true, tasks });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/tasks
 * Body: { title, description?, deadline, category, boardId?, order? }
 * Response 201: { success: true, task }
 */
const createTask = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const task = await taskService.createTask(userId, req.body);
    return res.status(201).json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/tasks/:id
 * Response 200: { success: true, task }
 */
const getTaskById = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const task = await taskService.getTaskById(req.params.id, userId);
    return res.status(200).json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/tasks/:id
 * Body: { title?, description?, deadline?, category?, status?, order? }
 * Response 200: { success: true, task }
 */
const updateTask = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const task = await taskService.updateTask(req.params.id, userId, req.body);
    return res.status(200).json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/tasks/:id
 * Response 200: { success: true, message }
 */
const deleteTask = async (req, res, next) => {
  try {
    const { userId } = req.user;
    await taskService.deleteTask(req.params.id, userId);
    return res.status(200).json({ success: true, message: 'Task berhasil dihapus' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTasks, createTask, getTaskById, updateTask, deleteTask };
