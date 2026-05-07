import { createContext, useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { API_URL } from '../utils/constants.js'

export const SocketContext = createContext(null)

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  // Keep a ref so cleanup in useEffect always has the latest socket instance
  const socketRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    const newSocket = io(API_URL, {
      query: { token },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 16000,
    })

    socketRef.current = newSocket
    setSocket(newSocket)

    newSocket.on('connect', () => {
      setIsConnected(true)
    })

    newSocket.on('disconnect', () => {
      setIsConnected(false)
    })

    return () => {
      newSocket.disconnect()
    }
  }, [])

  /**
   * Join a board room to receive real-time updates for that board.
   * @param {string} boardId
   */
  const joinBoard = (boardId) => {
    if (socketRef.current) {
      socketRef.current.emit('join-board', { boardId })
    }
  }

  /**
   * Leave a board room.
   * @param {string} boardId
   */
  const leaveBoard = (boardId) => {
    if (socketRef.current) {
      socketRef.current.emit('leave-board', { boardId })
    }
  }

  /**
   * Emit a task-created event to the board room.
   * @param {object} task
   * @param {string} boardId
   */
  const emitTaskCreated = (task, boardId) => {
    if (socketRef.current) {
      socketRef.current.emit('task-created', { task, boardId })
    }
  }

  /**
   * Emit a task-updated event to the board room.
   * @param {object} task
   * @param {string} boardId
   */
  const emitTaskUpdated = (task, boardId) => {
    if (socketRef.current) {
      socketRef.current.emit('task-updated', { task, boardId })
    }
  }

  /**
   * Emit a task-deleted event to the board room.
   * @param {string} taskId
   * @param {string} boardId
   */
  const emitTaskDeleted = (taskId, boardId) => {
    if (socketRef.current) {
      socketRef.current.emit('task-deleted', { taskId, boardId })
    }
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        joinBoard,
        leaveBoard,
        emitTaskCreated,
        emitTaskUpdated,
        emitTaskDeleted,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}
