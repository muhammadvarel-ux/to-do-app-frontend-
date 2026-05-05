import { motion, AnimatePresence } from 'framer-motion'

/**
 * Loader — fullscreen loading overlay with a spinning animation.
 *
 * Props:
 *   isLoading {boolean} — when true the overlay is visible; when false it fades out and unmounts.
 *
 * Requirements: 1.1, 1.2, 1.3, 1.4
 */
function Loader({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
          // Block all pointer interactions while the loader is visible
          style={{ pointerEvents: 'all' }}
          aria-label="Loading"
          aria-live="polite"
        >
          {/* Spinner */}
          <motion.span
            className="block h-14 w-14 rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-indigo-500 dark:border-t-indigo-400"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loader
