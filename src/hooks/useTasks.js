import { useContext } from 'react'
import { TaskContext } from '../contexts/TaskContext.jsx'

/**
 * Hook to consume TaskContext.
 * Must be used inside a TaskProvider.
 */
export default function useTasks() {
  return useContext(TaskContext)
}
