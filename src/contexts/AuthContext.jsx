import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService.js'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // On mount: restore user from localStorage if token exists
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setToken(storedToken)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch {
        // Corrupted data — clear it
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
  }, [])

  /**
   * Login with email and password.
   * Saves token and user to localStorage and updates state.
   */
  const login = async (email, password) => {
    const data = await authService.login(email, password)
    const { token: newToken, user: newUser } = data

    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))

    setToken(newToken)
    setUser(newUser)
    setIsAuthenticated(true)

    return data
  }

  /**
   * Register a new account.
   * Saves token and user to localStorage and updates state.
   */
  const register = async (name, email, password) => {
    const data = await authService.register(name, email, password)
    const { token: newToken, user: newUser } = data

    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))

    setToken(newToken)
    setUser(newUser)
    setIsAuthenticated(true)

    return data
  }

  /**
   * Logout: remove token and user from localStorage and reset state.
   */
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
