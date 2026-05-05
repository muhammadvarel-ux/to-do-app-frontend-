/**
 * Format a date to a locale-friendly string.
 * @param {Date|string} date
 * @returns {string}
 */
export function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Calculate the time remaining until a deadline.
 * @param {Date|string} deadline
 * @returns {{ days: number, hours: number, minutes: number, isOverdue: boolean }}
 */
export function getTimeRemaining(deadline) {
  const now = new Date()
  const target = new Date(deadline)
  const diffMs = target - now

  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, isOverdue: true }
  }

  const totalMinutes = Math.floor(diffMs / (1000 * 60))
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
  const minutes = totalMinutes % 60

  return { days, hours, minutes, isOverdue: false }
}

/**
 * Format a deadline into a human-readable string.
 * @param {Date|string} deadline
 * @returns {string}
 */
export function formatDeadline(deadline) {
  if (!deadline) return ''
  const { days, hours, minutes, isOverdue } = getTimeRemaining(deadline)

  if (isOverdue) return 'Terlambat'

  if (days > 0) {
    return `${days} hari lagi`
  }
  if (hours > 0) {
    return `${hours} jam lagi`
  }
  return `${minutes} menit lagi`
}
