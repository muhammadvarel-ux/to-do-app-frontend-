import { motion } from 'framer-motion'

/**
 * Input — reusable input field with label, error state, and subtle focus animation.
 *
 * Props:
 *   label       {string}   — visible label text
 *   name        {string}   — input name attribute
 *   type        {string}   — HTML input type (default: 'text')
 *   value       {string}   — controlled value
 *   onChange    {function} — change handler
 *   error       {string}   — error message; when truthy the input shows error styling
 *   placeholder {string}   — placeholder text
 *   required    {boolean}  — marks the field as required (default: false)
 *   className   {string}   — additional classes for the wrapper (default: '')
 *
 * Requirements: 13.2, 13.3
 */
export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  className = '',
}) {
  const inputBase =
    'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-colors'
  const inputError = error
    ? 'border-red-500 focus:ring-red-400'
    : 'border-gray-300 dark:border-gray-600'

  return (
    <motion.div
      className={`flex flex-col gap-1 ${className}`}
      // Subtle lift on focus-within to signal interactivity
      whileFocusWithin={{ y: -1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${inputBase} ${inputError}`}
      />

      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className="text-xs text-red-500 mt-0.5"
        >
          {error}
        </p>
      )}
    </motion.div>
  )
}
