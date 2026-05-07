import useTasks from '../../hooks/useTasks'
import TaskCard from './TaskCard'

/**
 * Skeleton card shown while tasks are loading.
 * Uses animate-pulse to give a subtle loading effect.
 */
function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-32" />
  )
}

/**
 * TaskList — renders the list of filtered tasks with loading and empty states.
 *
 * Props:
 *   onEdit   — callback(task) passed down to each TaskCard
 *   onDelete — callback(taskId) passed down to each TaskCard
 */
export default function TaskList({ onEdit, onDelete }) {
  const { filteredTasks, loading } = useTasks()

  // Loading state: show 3 skeleton cards
  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    )
  }

  // Empty state: no tasks match the current filter/search
  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 dark:text-gray-500">
        {/* Subtle icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mb-3 h-12 w-12 opacity-40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="text-sm font-medium">Tidak ada task yang ditemukan</p>
      </div>
    )
  }

  // Task list
  return (
    <div className="flex flex-col gap-3">
      {filteredTasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
