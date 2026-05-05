/**
 * Validate an email address.
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email) {
  if (typeof email !== 'string') return false
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.trim())
}

/**
 * Validate a password (minimum 6 characters).
 * @param {string} password
 * @returns {boolean}
 */
export function validatePassword(password) {
  if (typeof password !== 'string') return false
  return password.length >= 6
}

/**
 * Validate a name (minimum 2 characters).
 * @param {string} name
 * @returns {boolean}
 */
export function validateName(name) {
  if (typeof name !== 'string') return false
  return name.trim().length >= 2
}

/**
 * Validate a task title (non-empty).
 * @param {string} title
 * @returns {boolean}
 */
export function validateTaskTitle(title) {
  if (typeof title !== 'string') return false
  return title.trim().length > 0
}

/**
 * Validate a deadline (must be a valid date and not in the past).
 * @param {Date|string} deadline
 * @returns {boolean}
 */
export function validateDeadline(deadline) {
  if (!deadline) return false
  const d = new Date(deadline)
  if (isNaN(d.getTime())) return false
  return d > new Date()
}
