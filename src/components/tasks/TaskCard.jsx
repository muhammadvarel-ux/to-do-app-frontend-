import { motion } from 'framer-motion'
import useTasks from '../../hooks/useTasks'
import { formatDeadline, getTimeRemaining } from '../../utils/dateUtils'

/**
 * Category badge color mapping.
 */
const CATEGORY_COLORS = {
  kuliah: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  kerja: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  pribadi: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
}

/**
 * Status badge color mapping.
 */
const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  completed: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
}

/**
 * TaskCard — displays a single task with its details and action buttons.
 *
 * Props:
 *   task        — task object from the API
 *   onEdit      — callback(task) to open the edit form
 *   onDelete    — callback(taskId) to delete the task
 *   onDragStart — callback(e, taskId) from useDragDrop (optional)
 *   onDragEnd   — callback() from useDragDrop (optional)
 */
export default function TaskCard({ task, onEdit, onDelete, onDragStart, onDragEnd }) {
  const { updateTask } = useTasks()

  const isOverdue =
    task.status === 'pending' &&
    task.deadline &&
    getTimeRemaining(task.deadline).isOverdue

  const deadlineText = task.deadline ? formatDeadline(task.deadline) : null

  /**
   * Toggle task status between pending and completed.
   */
  async function handleToggleStatus() {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending'
    await updateTask(task._id, { status: newStatus })
  }

  return (
    <motion.div
      draggable={true}
      onDragStart={onDragStart ? (e) => onDragStart(e, task._id) : undefined}
      onDragEnd={onDragEnd ?? undefined}
      whileHover={{ scale: 1.01, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={[
        'bg-white dark:bg-gray-800 rounded-xl p-4 border cursor-grab active:cursor-grabbing',
        isOverdue
          ? 'border-red-400 dark:border-red-500'
          : 'border-gray-200 dark:border-gray-700',
      ].join(' ')}
    >
      {/* Header row: title + status badge */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3
          className={[
            'font-semibold text-gray-900 dark:text-white text-sm leading-snug flex-1',
            task.status === 'completed' ? 'line-through opacity-60' : '',
          ].join(' ')}
        >
          {task.title}
        </h3>

        {/* Status badge */}
        <span
          className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[task.status] ?? ''}`}
        >
          {task.status === 'completed' ? 'Selesai' : 'Pending'}
        </span>
      </div>

      {/* Description (optional) */}
      {task.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Category + deadline row */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Category badge */}
        {task.category && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${CATEGORY_COLORS[task.category] ?? 'bg-gray-100 text-gray-600'}`}
          >
            {task.category}
          </span>
        )}

        {/* Deadline */}
        {deadlineText && (
          <span
            className={`text-xs font-medium ${isOverdue ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}
          >
            ⏰ {deadlineText}
          </span>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Toggle complete / pending */}
        <button
          onClick={handleToggleStatus}
          className={[
            'text-xs font-medium px-3 py-1.5 rounded-lg transition-colors',
            task.status === 'pending'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-yellow-500 hover:bg-yellow-600 text-white',
          ].join(' ')}
        >
          {task.status === 'pending' ? 'Tandai Selesai' : 'Tandai Pending'}
        </button>

        {/* Edit button */}
        <button
          onClick={() => onEdit(task)}
          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Edit
        </button>

        {/* Delete button */}
        <button
          onClick={() => onDelete(task._id)}
          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
        >
          Hapus
        </button>
      </div>
    </motion.div>
  )
}
