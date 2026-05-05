import { motion } from 'framer-motion'

/**
 * Button — reusable button with variant styles and micro-interaction animations.
 *
 * Props:
 *   children    {ReactNode}  — button label / content
 *   variant     {string}     — 'primary' | 'secondary' | 'danger' (default: 'primary')
 *   onClick     {function}   — click handler
 *   type        {string}     — HTML button type (default: 'button')
 *   disabled    {boolean}    — disables the button (default: false)
 *   className   {string}     — additional Tailwind classes (default: '')
 *
 * Requirements: 13.2, 13.3
 */

const variantClasses = {
  primary:
    'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500',
  secondary:
    'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white focus:ring-gray-400',
  danger:
    'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400',
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) {
  const base =
    'px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2'
  const variantStyle = variantClasses[variant] ?? variantClasses.primary
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`${base} ${variantStyle} ${disabledStyle} ${className}`.trim()}
    >
      {children}
    </motion.button>
  )
}
