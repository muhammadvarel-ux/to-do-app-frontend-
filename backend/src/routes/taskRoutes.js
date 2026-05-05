// routes/taskRoutes.js
// Task endpoints — all routes protected by authMiddleware

const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const {
  validateTask,
  validateTaskUpdate,
  handleValidationErrors,
} = require('../middleware/validator');
const {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// All task routes require authentication
router.use(authMiddleware);

// GET /api/tasks
router.get('/', getTasks);

// POST /api/tasks
router.post('/', [...validateTask, handleValidationErrors, createTask]);

// GET /api/tasks/:id
router.get('/:id', getTaskById);

// PUT /api/tasks/:id
router.put('/:id', [...validateTaskUpdate, handleValidationErrors, updateTask]);

// DELETE /api/tasks/:id
router.delete('/:id', deleteTask);

module.exports = router;
