import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'

/**
 * ProtectedRoute — redirects to /login if the user is not authenticated.
 * Renders children (or <Outlet /> for nested routes) when authenticated.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children ?? <Outlet />
}
