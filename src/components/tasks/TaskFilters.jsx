import useTasks from '../../hooks/useTasks'

const FILTER_OPTIONS = [
  { value: 'all', label: 'Semua' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Selesai' },
]

/**
 * TaskFilters — filter buttons (All/Pending/Completed) and text search input.
 * Connects to TaskContext to update filter state in real-time.
 */
export default function TaskFilters() {
  const { filter, searchQuery, setFilter, setSearchQuery } = useTasks()

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      {/* Filter buttons */}
      <div className="flex gap-2">
        {FILTER_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={
              filter === value
                ? 'px-3 py-1.5 rounded-lg text-sm font-medium bg-indigo-600 text-white'
                : 'px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Search input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Cari task..."
        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      />
    </div>
  )
}
