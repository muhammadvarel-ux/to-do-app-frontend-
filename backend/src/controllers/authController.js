// controllers/authController.js
// Route handlers for POST /api/auth/register and POST /api/auth/login

const authService = require('../services/authService');

/**
 * POST /api/auth/register
 * Body: { name, email, password }
 * Response 201: { success: true, token, user }
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { token, user } = await authService.register(name, email, password);
    return res.status(201).json({ success: true, token, user });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Response 200: { success: true, token, user }
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);
    return res.status(200).json({ success: true, token, user });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
