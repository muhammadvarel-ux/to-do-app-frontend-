import { createContext, useState, useCallback, useMemo } from 'react'
import taskService from '../services/taskService.js'

export const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  /**
   * Fetch all tasks from the API and update state.
   */
  const fetchTasks = useCallback(async (params) => {
    setLoading(true)
    setError(null)
    try {
      const data = await taskService.getTasks(params)
      // API may return { tasks: [...] } or an array directly
      setTasks(Array.isArray(data) ? data : data.tasks ?? [])
    } catch (err) {
      setError(err.response?.data?.message ?? err.message ?? 'Gagal memuat tasks')
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Create a new task and append it to the local state.
   */
  const createTask = useCallback(async (taskData) => {
    const data = await taskService.createTask(taskData)
    const newTask = data.task ?? data
    setTasks((prev) => [...prev, newTask])
    return newTask
  }, [])

  /**
   * Update an existing task in the local state.
   */
  const updateTask = useCallback(async (id, taskData) => {
    const data = await taskService.updateTask(id, taskData)
    const updatedTask = data.task ?? data
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? updatedTask : task))
    )
    return updatedTask
  }, [])

  /**
   * Delete a task and remove it from the local state.
   */
  const deleteTask = useCallback(async (id) => {
    await taskService.deleteTask(id)
    setTasks((prev) => prev.filter((task) => task._id !== id))
  }, [])

  /**
   * Add a task received from a socket event (no API call).
   * Used for real-time collaborative updates.
   */
  const addTaskFromSocket = useCallback((task) => {
    setTasks((prev) => {
      // Avoid duplicates if the task already exists
      const exists = prev.some((t) => t._id === task._id)
      if (exists) return prev
      return [...prev, task]
    })
  }, [])

  /**
   * Update a task received from a socket event (no API call).
   * Used for real-time collaborative updates.
   */
  const updateTaskFromSocket = useCallback((task) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? task : t))
    )
  }, [])

  /**
   * Remove a task received from a socket event (no API call).
   * Used for real-time collaborative updates.
   */
  const removeTaskFromSocket = useCallback((taskId) => {
    setTasks((prev) => prev.filter((t) => t._id !== taskId))
  }, [])

  /**
   * Computed list of tasks after applying status filter and text search.
   * 1. Apply status filter (skip if 'all')
   * 2. Apply case-insensitive text search on title and description
   */
  const filteredTasks = useMemo(() => {
    let result = tasks

    // Step 1: status filter
    if (filter !== 'all') {
      result = result.filter((task) => task.status === filter)
    }

    // Step 2: text search (case-insensitive, title + description)
    const query = searchQuery.trim().toLowerCase()
    if (query) {
      result = result.filter((task) => {
        const titleMatch = task.title?.toLowerCase().includes(query)
        const descMatch = task.description?.toLowerCase().includes(query)
        return titleMatch || descMatch
      })
    }

    return result
  }, [tasks, filter, searchQuery])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        loading,
        error,
        filter,
        searchQuery,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        setFilter,
        setSearchQuery,
        addTaskFromSocket,
        updateTaskFromSocket,
        removeTaskFromSocket,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
