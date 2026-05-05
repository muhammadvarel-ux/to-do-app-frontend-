import api from './api.js'

const taskService = {
  /**
   * Get all tasks, optionally filtered by query params
   * @param {Object} params - Query parameters (e.g. { status, boardId })
   * @returns {Promise<Object>} response data containing tasks array
   */
  getTasks: async (params) => {
    const response = await api.get('/api/tasks', { params })
    return response.data
  },

  /**
   * Get a single task by ID
   * @param {string} id - Task ID
   * @returns {Promise<Object>} response data containing the task
   */
  getTaskById: async (id) => {
    const response = await api.get(`/api/tasks/${id}`)
    return response.data
  },

  /**
   * Create a new task
   * @param {Object} taskData - Task fields (title, description, deadline, category, boardId?)
   * @returns {Promise<Object>} response data containing the created task
   */
  createTask: async (taskData) => {
    const response = await api.post('/api/tasks', taskData)
    return response.data
  },

  /**
   * Update an existing task
   * @param {string} id - Task ID
   * @param {Object} taskData - Fields to update
   * @returns {Promise<Object>} response data containing the updated task
   */
  updateTask: async (id, taskData) => {
    const response = await api.put(`/api/tasks/${id}`, taskData)
    return response.data
  },

  /**
   * Delete a task
   * @param {string} id - Task ID
   * @returns {Promise<Object>} response data with confirmation message
   */
  deleteTask: async (id) => {
    const response = await api.delete(`/api/tasks/${id}`)
    return response.data
  },
}

export default taskService
