import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext.jsx'

/**
 * Hook to consume AuthContext.
 * Must be used inside an AuthProvider.
 */
export default function useAuth() {
  return useContext(AuthContext)
}
