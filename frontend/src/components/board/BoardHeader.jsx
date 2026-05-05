import Button from '../common/Button.jsx'

/**
 * BoardHeader — displays the board name and action buttons.
 *
 * Props:
 *   boardId   {string}   — the board's ID (for future use)
 *   boardName {string}   — display name of the board
 *   onAddTask {function} — called when "Tambah Task" is clicked
 *   onInvite  {function} — called when "Undang Member" is clicked
 *
 * Requirements: 12.1, 12.2, 13.1
 */
export default function BoardHeader({ boardId, boardName, onAddTask, onInvite }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      {/* Board name */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
        {boardName || 'Board'}
      </h1>

      {/* Action buttons */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button variant="secondary" onClick={onInvite}>
          Undang Member
        </Button>
        <Button variant="primary" onClick={onAddTask}>
          Tambah Task
        </Button>
      </div>
    </div>
  )
}
