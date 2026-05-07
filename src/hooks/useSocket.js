import { useContext } from 'react'
import { SocketContext } from '../contexts/SocketContext.jsx'

/**
 * Hook to access the SocketContext.
 * Must be used inside a SocketProvider.
 */
export default function useSocket() {
  return useContext(SocketContext)
}
