// services/authService.js
// Business logic for authentication: register and login

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtConfig = require('../config/jwt');

/**
 * Register a new user.
 * - Checks for duplicate email (throws 409 if found)
 * - Creates the User document (password hashed via pre-save hook)
 * - Generates and returns a JWT
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {{ token: string, user: object }}
 */
const register = async (name, email, password) => {
  // Check for duplicate email
  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    const err = new Error('Email sudah terdaftar');
    err.statusCode = 409;
    throw err;
  }

  // Create user (password hashed by pre-save hook in User model)
  const user = await User.create({ name, email, password });

  // Generate JWT
  const token = jwt.sign(
    { userId: user._id },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );

  return { token, user };
};

/**
 * Login an existing user.
 * - Finds user by email (throws 401 if not found)
 * - Compares password (throws 401 if wrong)
 * - Generates and returns a JWT
 *
 * @param {string} email
 * @param {string} password
 * @returns {{ token: string, user: object }}
 */
const login = async (email, password) => {
  // Find user by email (include password field for comparison)
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
  if (!user) {
    const err = new Error('Email atau password tidak valid');
    err.statusCode = 401;
    throw err;
  }

  // Compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const err = new Error('Email atau password tidak valid');
    err.statusCode = 401;
    throw err;
  }

  // Generate JWT
  const token = jwt.sign(
    { userId: user._id },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );

  return { token, user };
};

module.exports = { register, login };
