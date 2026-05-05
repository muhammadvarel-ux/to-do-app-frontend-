import api from './api.js'

const authService = {
  /**
   * Register a new user
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} response data containing token and user
   */
  register: async (name, email, password) => {
    const response = await api.post('/api/auth/register', { name, email, password })
    return response.data
  },

  /**
   * Login an existing user
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} response data containing token and user
   */
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password })
    return response.data
  },
}

export default authService
