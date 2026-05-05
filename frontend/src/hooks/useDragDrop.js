import { useState } from 'react'

/**
 * useDragDrop — encapsulates HTML5 Drag and Drop API logic for the kanban board.
 *
 * State:
 *   draggedTaskId  — ID of the task currently being dragged (string | null)
 *   dragOverColumn — status of the column the dragged task is hovering over (string | null)
 *
 * Handlers:
 *   handleDragStart(e, taskId)                        — begin drag, store taskId in dataTransfer
 *   handleDragEnd()                                   — reset drag state
 *   handleDragOver(e, status)                         — allow drop, track hovered column
 *   handleDrop(e, status, tasks, updateTask)          — apply status or order update
 */
export default function useDragDrop() {
  const [draggedTaskId, setDraggedTaskId] = useState(null)
  const [dragOverColumn, setDragOverColumn] = useState(null)

  /**
   * Called when the user starts dragging a task card.
   * Stores the task ID in both component state and the dataTransfer object.
   */
  function handleDragStart(e, taskId) {
    setDraggedTaskId(taskId)
    e.dataTransfer.setData('taskId', taskId)
    // Use 'move' cursor to signal the intent
    e.dataTransfer.effectAllowed = 'move'
  }

  /**
   * Called when the drag operation ends (regardless of whether a drop occurred).
   * Resets all drag-related state.
   */
  function handleDragEnd() {
    setDraggedTaskId(null)
    setDragOverColumn(null)
  }

  /**
   * Called repeatedly while a dragged item hovers over a droppable column.
   * Prevents the default browser behaviour (which would cancel the drop) and
   * tracks which column is currently being hovered.
   */
  function handleDragOver(e, status) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverColumn(status)
  }

  /**
   * Called when the user releases the dragged task over a column.
   *
   * - If the target column has a different status than the task's current status,
   *   update the task's status via TaskContext (PUT /tasks/:id).
   * - If the task is dropped within the same column, update the `order` field
   *   to reflect the new position (order = number of tasks already in that column).
   *
   * @param {DragEvent}  e          — the drop event
   * @param {string}     status     — the status of the target column ('pending' | 'completed')
   * @param {Array}      tasks      — full task list from TaskContext (used to find the dragged task)
   * @param {Function}   updateTask — TaskContext updateTask(id, data) function
   */
  async function handleDrop(e, status, tasks, updateTask) {
    e.preventDefault()

    const taskId = e.dataTransfer.getData('taskId')
    if (!taskId) {
      setDraggedTaskId(null)
      setDragOverColumn(null)
      return
    }

    const draggedTask = tasks.find((t) => t._id === taskId)
    if (!draggedTask) {
      setDraggedTaskId(null)
      setDragOverColumn(null)
      return
    }

    if (draggedTask.status !== status) {
      // Dropped onto a different column — update status
      await updateTask(taskId, { status })
    } else {
      // Dropped within the same column — update order to end of column
      const tasksInColumn = tasks.filter((t) => t.status === status && t._id !== taskId)
      const newOrder = tasksInColumn.length
      if (draggedTask.order !== newOrder) {
        await updateTask(taskId, { order: newOrder })
      }
    }

    setDraggedTaskId(null)
    setDragOverColumn(null)
  }

  return {
    draggedTaskId,
    dragOverColumn,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  }
}
