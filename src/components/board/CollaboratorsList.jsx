/**
 * CollaboratorsList — shows the real-time connection status for the board.
 *
 * Props:
 *   boardId     {string}  — the board's ID (reserved for future member list)
 *   isConnected {boolean} — whether the Socket.io connection is active
 *
 * Requirements: 11.5, 12.5
 */
export default function CollaboratorsList({ boardId, isConnected }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      {/* Connection status dot */}
      <span
        className={`inline-block w-2.5 h-2.5 rounded-full flex-shrink-0 ${
          isConnected ? 'bg-green-500' : 'bg-red-500'
        }`}
        aria-hidden="true"
      />
      <span
        className={`text-sm font-medium ${
          isConnected
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'
        }`}
      >
        {isConnected ? 'Online' : 'Offline'}
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        — {isConnected ? 'Terhubung ke board' : 'Koneksi terputus'}
      </span>
    </div>
  )
}
