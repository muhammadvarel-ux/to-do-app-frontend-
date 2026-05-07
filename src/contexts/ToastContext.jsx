import { createContext, useState, useCallback } from 'react'

export const ToastContext = createContext(null)

const MAX_TOASTS = 3

/**
 * Generates a unique id for each toast.
 */
let nextId = 1
function generateId() {
  return nextId++
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const [queue, setQueue] = useState([])

  /**
   * Schedule auto-removal of a toast after 3 seconds.
   */
  const scheduleRemoval = useCallback((id) => {
    setTimeout(() => {
      removeToast(id)
    }, 3000)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Remove a toast by id.
   * If there are queued toasts, promote the first one to active.
   */
  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => {
      const updated = prevToasts.filter((t) => t.id !== id)

      // Promote first queued item if any
      setQueue((prevQueue) => {
        if (prevQueue.length === 0) return prevQueue

        const [next, ...rest] = prevQueue
        // Schedule auto-removal for the promoted toast
        setTimeout(() => {
          removeToast(next.id)
        }, 3000)

        setToasts((current) => [...current.filter((t) => t.id !== id), next])
        return rest
      })

      return updated
    })
  }, [])

  /**
   * Add a new toast.
   * If MAX_TOASTS is reached, the toast is added to the queue instead.
   *
   * @param {string} message - The message to display
   * @param {'success'|'error'} type - The toast type
   */
  const addToast = useCallback(
    (message, type = 'success') => {
      const id = generateId()
      const toast = { id, message, type }

      setToasts((prevToasts) => {
        if (prevToasts.length < MAX_TOASTS) {
          // Schedule auto-removal
          setTimeout(() => {
            removeToast(id)
          }, 3000)
          return [...prevToasts, toast]
        }

        // Queue the toast for later
        setQueue((prevQueue) => [...prevQueue, toast])
        return prevToasts
      })
    },
    [removeToast]
  )

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}
