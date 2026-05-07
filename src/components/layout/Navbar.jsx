import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuth from '../../hooks/useAuth'
import useTheme from '../../hooks/useTheme'

/**
 * Navbar component with dark mode toggle, user info, and logout button.
 * Requirements: 10.1, 10.4, 13.1
 */
export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* App name / logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">
            TaskFlow
          </span>
        </div>

        {/* Right side: dark mode toggle, user info, logout */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isDark ? '☀️' : '🌙'}
          </motion.button>

          {/* User name */}
          {user && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
              {user.name}
            </span>
          )}

          {/* Logout button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Logout
          </motion.button>
        </div>
      </div>
    </nav>
  )
}
