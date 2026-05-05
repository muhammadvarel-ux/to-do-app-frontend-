// middleware/validator.js
// Request validation middleware using express-validator
// Exports validation rule arrays and handleValidationErrors middleware

const { body, validationResult } = require('express-validator');

// ─── Auth Validation Rules ────────────────────────────────────────────────────

/**
 * Validation rules for POST /api/auth/register
 * - name: required, min 2 characters
 * - email: must be a valid email address
 * - password: required, min 6 characters
 */
const validateRegister = [
  body('name')
    .notEmpty()
    .withMessage('Nama wajib diisi')
    .isLength({ min: 2 })
    .withMessage('Nama minimal 2 karakter')
    .trim(),

  body('email')
    .isEmail()
    .withMessage('Format email tidak valid')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password minimal 6 karakter'),
];

/**
 * Validation rules for POST /api/auth/login
 * - email: must be a valid email address
 * - password: required (non-empty)
 */
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Format email tidak valid')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password wajib diisi'),
];

// ─── Task Validation Rules ────────────────────────────────────────────────────

/**
 * Validation rules for POST /api/tasks (create task)
 * - title: required, non-empty
 * - deadline: required, must be a valid ISO 8601 date string
 * - category: required, must be one of ['kuliah', 'kerja', 'pribadi']
 */
const validateTask = [
  body('title')
    .notEmpty()
    .withMessage('Judul task wajib diisi')
    .trim(),

  body('deadline')
    .notEmpty()
    .withMessage('Deadline wajib diisi')
    .isISO8601()
    .withMessage('Format deadline tidak valid, gunakan format ISO 8601'),

  body('category')
    .notEmpty()
    .withMessage('Kategori wajib diisi')
    .isIn(['kuliah', 'kerja', 'pribadi'])
    .withMessage('Kategori harus salah satu dari: kuliah, kerja, pribadi'),
];

/**
 * Validation rules for PUT /api/tasks/:id (update task)
 * All fields are optional, but if present they must be valid:
 * - title: if present, must be non-empty
 * - deadline: if present, must be a valid ISO 8601 date string
 * - category: if present, must be one of ['kuliah', 'kerja', 'pribadi']
 * - status: if present, must be one of ['pending', 'completed']
 */
const validateTaskUpdate = [
  body('title')
    .optional()
    .notEmpty()
    .withMessage('Judul task tidak boleh kosong')
    .trim(),

  body('deadline')
    .optional()
    .isISO8601()
    .withMessage('Format deadline tidak valid, gunakan format ISO 8601'),

  body('category')
    .optional()
    .isIn(['kuliah', 'kerja', 'pribadi'])
    .withMessage('Kategori harus salah satu dari: kuliah, kerja, pribadi'),

  body('status')
    .optional()
    .isIn(['pending', 'completed'])
    .withMessage('Status harus salah satu dari: pending, completed'),
];

// ─── Validation Error Handler ─────────────────────────────────────────────────

/**
 * Middleware that checks the result of express-validator rules.
 * If there are validation errors, responds with HTTP 400 and a list of
 * field-level error messages.
 *
 * Response format on failure:
 * {
 *   success: false,
 *   message: 'Validasi gagal',
 *   errors: [{ field: string, message: string }]
 * }
 *
 * If validation passes, calls next() to continue to the route handler.
 */
const handleValidationErrors = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors = result.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return res.status(400).json({
      success: false,
      message: 'Validasi gagal',
      errors,
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateTask,
  validateTaskUpdate,
  handleValidationErrors,
};
