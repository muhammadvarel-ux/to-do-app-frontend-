import useTasks from '../../hooks/useTasks'
import useDragDrop from '../../hooks/useDragDrop'
import BoardColumn from '../board/BoardColumn'

/**
 * TaskBoard — two-column kanban layout (Pending | Completed).
 *
 * Props:
 *   onEdit   — callback(task) forwarded to each TaskCard via BoardColumn
 *   onDelete — callback(taskId) forwarded to each TaskCard via BoardColumn
 *
 * Drag-and-drop is handled by the useDragDrop hook using the HTML5 Drag and Drop API.
 */
export default function TaskBoard({ onEdit, onDelete }) {
  const { tasks, filteredTasks, updateTask } = useTasks()
  const {
    draggedTaskId,
    dragOverColumn,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  } = useDragDrop()

  const pendingTasks = filteredTasks.filter((task) => task.status === 'pending')
  const completedTasks = filteredTasks.filter((task) => task.status === 'completed')

  /**
   * Wraps the hook's handleDrop to inject the full task list and updateTask function.
   */
  function onDrop(e, status) {
    handleDrop(e, status, tasks, updateTask)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BoardColumn
        title="Pending"
        tasks={pendingTasks}
        onEdit={onEdit}
        onDelete={onDelete}
        onDrop={onDrop}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        status="pending"
        isDragOver={dragOverColumn === 'pending'}
      />
      <BoardColumn
        title="Completed"
        tasks={completedTasks}
        onEdit={onEdit}
        onDelete={onDelete}
        onDrop={onDrop}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        status="completed"
        isDragOver={dragOverColumn === 'completed'}
      />
    </div>
  )
}
