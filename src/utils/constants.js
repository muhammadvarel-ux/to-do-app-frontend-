// Kategori task yang tersedia
export const CATEGORIES = ['kuliah', 'kerja', 'pribadi']

// Status task
export const TASK_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
}

// Base URL untuk API backend
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
