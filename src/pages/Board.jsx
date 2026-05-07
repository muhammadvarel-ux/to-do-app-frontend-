import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout.jsx'
import BoardHeader from '../components/board/BoardHeader.jsx'
import CollaboratorsList from '../components/board/CollaboratorsList.jsx'
import TaskBoard from '../components/tasks/TaskBoard.jsx'
import TaskForm from '../components/tasks/TaskForm.jsx'
import useTasks from '../hooks/useTasks.js'
import useSocket from '../hooks/useSocket.js'
import useToast from '../hooks/useToast.js'
import boardService from '../services/boardService.js'

/**
 * Board — kanban view for a specific board.
 *
 * - Fetches board info and tasks filtered by boardId on mount
 * - Joins the Socket.io board room on mount, leaves on unmount
 * - Subscribes to real-time task events (task-created, task-updated, task-deleted)
 * - Emits socket events after local task operations (create, update, delete)
 * - Shows BoardHeader, CollaboratorsList, and TaskBoard (kanban)
 * - TaskForm modal for create / edit
 *
 * Requirements: 11.3, 11.4, 11.5, 12.1–12.5, 13.1
 */
export default function Board() {
  const { boardId } = useParams()
  const {
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    addTaskFromSocket,
    updateTaskFromSocket,
    removeTaskFromSocket,
  } = useTasks()
  const {
    socket,
    isConnected,
    joinBoard,
    leaveBoard,
    emitTaskCreated,
    emitTaskUpdated,
    emitTaskDeleted,
  } = useSocket()
  const { showSuccess, showError } = useToast()

  const [board, setBoard] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch board info and tasks, then join the socket room
  useEffect(() => {
    let cancelled = false

    async function init() {
      setLoading(true)
      try {
        // boardService doesn't expose getBoardById; fetch all and find by id
        const data = await boardService.getBoards()
        const boards = Array.isArray(data) ? data : data.boards ?? []
        const found = boards.find((b) => b._id === boardId) ?? null
        if (!cancelled) setBoard(found)
      } catch {
        // Non-critical — board name will fall back to "Board"
      } finally {
        if (!cancelled) setLoading(false)
      }

      // Fetch tasks scoped to this board
      fetchTasks({ boardId })

      // Join the Socket.io room for real-time updates
      joinBoard(boardId)
    }

    init()

    return () => {
      cancelled = true
      leaveBoard(boardId)
    }
  }, [boardId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Subscribe to real-time socket events for collaborative task updates
  useEffect(() => {
    if (!socket) return

    function onTaskCreated({ task }) {
      addTaskFromSocket(task)
    }

    function onTaskUpdated({ task }) {
      updateTaskFromSocket(task)
    }

    function onTaskDeleted({ taskId }) {
      removeTaskFromSocket(taskId)
    }

    socket.on('task-created', onTaskCreated)
    socket.on('task-updated', onTaskUpdated)
    socket.on('task-deleted', onTaskDeleted)

    return () => {
      socket.off('task-created', onTaskCreated)
      socket.off('task-updated', onTaskUpdated)
      socket.off('task-deleted', onTaskDeleted)
    }
  }, [socket, addTaskFromSocket, updateTaskFromSocket, removeTaskFromSocket])

  function handleOpenCreate() {
    setEditingTask(null)
    setIsFormOpen(true)
  }

  function handleEdit(task) {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  function handleCloseForm() {
    setIsFormOpen(false)
    setEditingTask(null)
  }

  async function handleDelete(taskId) {
    try {
      await deleteTask(taskId)
      emitTaskDeleted(taskId, boardId)
      showSuccess('Task berhasil dihapus')
    } catch {
      showError('Gagal menghapus task. Coba lagi.')
    }
  }

  /**
   * Called by TaskForm after a successful create or update.
   * Emits the appropriate socket event so other board members see the change.
   */
  function handleTaskSaved(task, isEdit) {
    if (isEdit) {
      emitTaskUpdated(task, boardId)
    } else {
      emitTaskCreated(task, boardId)
    }
  }

  function handleInvite() {
    // Placeholder — invite flow can be wired up in task 18
    showSuccess('Fitur undang member akan segera hadir')
  }

  const boardName = board?.name ?? (loading ? '...' : 'Board')

  return (
    <MainLayout>
      {/* Board header: name + action buttons */}
      <BoardHeader
        boardId={boardId}
        boardName={boardName}
        onAddTask={handleOpenCreate}
        onInvite={handleInvite}
      />

      {/* Connection / collaborators status */}
      <CollaboratorsList boardId={boardId} isConnected={isConnected} />

      {/* Kanban board */}
      <TaskBoard onEdit={handleEdit} onDelete={handleDelete} />

      {/* Create / Edit task modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        task={editingTask}
        onSaved={handleTaskSaved}
      />
    </MainLayout>
  )
}
