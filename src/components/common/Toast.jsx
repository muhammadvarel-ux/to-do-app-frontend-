import { AnimatePresence, motion } from 'framer-motion'
import useToast from '../../hooks/useToast.js'

/**
 * Toast container component.
 * Renders all active toasts from ToastContext at the bottom-right of the screen.
 * Uses Framer Motion AnimatePresence for enter/exit animations.
 *
 * Requirements: 9.1, 9.2, 9.3, 9.4
 */
export default function Toast() {
  const { toasts, removeToast } = useToast()

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      aria-live="polite"
      aria-label="Notifications"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`flex items-center justify-between rounded-lg shadow-lg px-4 py-3 text-white min-w-[240px] max-w-sm ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
            role="alert"
          >
            <span className="text-sm font-medium">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 text-white/80 hover:text-white transition-colors text-lg leading-none"
              aria-label="Tutup notifikasi"
            >
              &times;
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
