import axios from 'axios'
import { API_URL } from '../utils/constants.js'

// Create Axios instance with baseURL from constants and 10s timeout
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

// Request interceptor: attach JWT from localStorage if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: handle 401 by clearing token and redirecting to /login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
