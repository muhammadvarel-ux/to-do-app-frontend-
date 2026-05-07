import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from '../tasks/TaskCard'

/**
 * BoardColumn — a kanban column that displays a list of TaskCard components.
 *
 * Props:
 *   title       — column header text (e.g. "Pending", "Completed")
 *   tasks       — array of task objects to display in this column
 *   onEdit      — callback(task) forwarded to each TaskCard
 *   onDelete    — callback(taskId) forwarded to each TaskCard
 *   onDrop      — callback(e, status) called when a task is dropped onto this column
 *   onDragOver  — callback(e, status) from useDragDrop; called while dragging over this column
 *   onDragStart — callback(e, taskId) from useDragDrop; forwarded to each TaskCard
 *   onDragEnd   — callback() from useDragDrop; forwarded to each TaskCard
 *   status      — the status value this column represents ('pending' | 'completed')
 *   isDragOver  — boolean; true when a task is being dragged over this column
 */
export default function BoardColumn({
  title,
  tasks,
  onEdit,
  onDelete,
  onDrop,
  onDragOver,
  onDragStart,
  onDragEnd,
  status,
  isDragOver,
}) {
  /**
   * Allow drop by preventing the default browser behaviour and
   * notifying the parent hook which column is being hovered.
   */
  function handleDragOver(e) {
    if (onDragOver) {
      onDragOver(e, status)
    } else {
      e.preventDefault()
    }
  }

  /**
   * Delegate drop handling to the parent with the column's status.
   */
  function handleDrop(e) {
    onDrop(e, status)
  }

  return (
    <motion.div
      animate={isDragOver ? { scale: 1.01 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={[
        'bg-gray-100 dark:bg-gray-800 rounded-xl p-4 min-h-[200px] transition-all duration-150',
        isDragOver ? 'ring-2 ring-indigo-400 dark:ring-indigo-500' : '',
      ].join(' ')}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Column header */}
      <div className="font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center justify-between">
        <span>{title}</span>
        {/* Task count badge */}
        <span className="text-xs bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-0.5">
          {tasks.length}
        </span>
      </div>

      {/* Drop zone indicator */}
      <AnimatePresence>
        {isDragOver && (
          <motion.div
            key="drop-indicator"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 8 }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-full bg-indigo-400 dark:bg-indigo-500 mb-3"
          />
        )}
      </AnimatePresence>

      {/* Task list */}
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center mt-6">
          Tidak ada task
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
