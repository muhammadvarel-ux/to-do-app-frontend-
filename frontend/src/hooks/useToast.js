import { useContext, useCallback } from 'react'
import { ToastContext } from '../contexts/ToastContext.jsx'

/**
 * Hook to consume ToastContext.
 * Must be used inside a ToastProvider.
 *
 * Returns the context value plus convenience methods:
 *   - showSuccess(message): add a success toast
 *   - showError(message): add an error toast
 */
export default function useToast() {
  const context = useContext(ToastContext)

  const showSuccess = useCallback(
    (message) => {
      context.addToast(message, 'success')
    },
    [context]
  )

  const showError = useCallback(
    (message) => {
      context.addToast(message, 'error')
    },
    [context]
  )

  return {
    ...context,
    showSuccess,
    showError,
  }
}
