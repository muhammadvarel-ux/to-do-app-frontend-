import { useEffect, useState } from 'react'
import MainLayout from '../components/layout/MainLayout.jsx'
import TaskFilters from '../components/tasks/TaskFilters.jsx'
import TaskList from '../components/tasks/TaskList.jsx'
import TaskForm from '../components/tasks/TaskForm.jsx'
import Button from '../components/common/Button.jsx'
import useTasks from '../hooks/useTasks.js'
import useToast from '../hooks/useToast.js'

/**
 * Dashboard — main page showing the user's task list with filters and search.
 *
 * - Fetches tasks on mount via TaskContext
 * - Shows skeleton loader while loading (handled by TaskList)
 * - "Buat Task" button opens TaskForm modal for creating a new task
 * - onEdit(task): opens TaskForm modal pre-filled with the selected task
 * - onDelete(taskId): deletes the task and shows a success/error toast
 *
 * Requirements: 4.2, 7.1–7.6, 13.1, 13.5
 */
export default function Dashboard() {
  const { fetchTasks, deleteTask } = useTasks()
  const { showSuccess, showError } = useToast()

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
      showSuccess('Task berhasil dihapus')
    } catch {
      showError('Gagal menghapus task. Coba lagi.')
    }
  }

  return (
    <MainLayout>
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Tasks
        </h1>
        <Button variant="primary" onClick={handleOpenCreate}>
          Buat Task
        </Button>
      </div>

      {/* Filters + search */}
      <div className="mb-4">
        <TaskFilters />
      </div>

      {/* Task list (handles loading skeleton and empty state internally) */}
      <TaskList onEdit={handleEdit} onDelete={handleDelete} />

      {/* Create / Edit modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        task={editingTask}
      />
    </MainLayout>
  )
}
