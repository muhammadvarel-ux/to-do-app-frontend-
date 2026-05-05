import api from './api.js'

const boardService = {
  /**
   * Get all boards for the authenticated user
   * @returns {Promise<Object>} response data containing boards array
   */
  getBoards: async () => {
    const response = await api.get('/api/boards')
    return response.data
  },

  /**
   * Create a new board
   * @param {Object} boardData - Board fields (name, description?)
   * @returns {Promise<Object>} response data containing the created board
   */
  createBoard: async (boardData) => {
    const response = await api.post('/api/boards', boardData)
    return response.data
  },

  /**
   * Invite a member to a board by email
   * @param {string} boardId - Board ID
   * @param {string} email - Email of the user to invite
   * @returns {Promise<Object>} response data containing the updated board
   */
  inviteMember: async (boardId, email) => {
    const response = await api.post(`/api/boards/${boardId}/invite`, { email })
    return response.data
  },

  /**
   * Remove a member from a board
   * @param {string} boardId - Board ID
   * @param {string} userId - User ID of the member to remove
   * @returns {Promise<Object>} response data containing the updated board
   */
  removeMember: async (boardId, userId) => {
    const response = await api.delete(`/api/boards/${boardId}/members/${userId}`)
    return response.data
  },
}

export default boardService
