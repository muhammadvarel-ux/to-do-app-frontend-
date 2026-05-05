import { useState, useEffect } from 'react'
import Modal from '../common/Modal.jsx'
import Input from '../common/Input.jsx'
import Button from '../common/Button.jsx'
import useTasks from '../../hooks/useTasks.js'
import useToast from '../../hooks/useToast.js'
import { CATEGORIES } from '../../utils/constants.js'

/**
 * TaskForm — modal form for creating and editing tasks.
 *
 * Props:
 *   isOpen   {boolean}           — controls modal visibility
 *   onClose  {function}          — called when the modal should close
 *   task     {object|null}       — null for create mode, task object for edit mode
 *   onSaved  {function|null}     — optional callback(savedTask, isEdit) after a successful save
 *
 * - Populates fields from task prop when in edit mode
 * - Resets fields when task is null (create mode)
 * - Validates title (required), deadline (required, valid date), category (required)
 * - Calls createTask or updateTask from TaskContext
 * - Shows success/error Toast after submit
 *
 * Requirements: 4.1, 4.4, 4.7, 9.1, 9.2
 */
export default function TaskForm({ isOpen, onClose, task, onSaved }) {
  const { createTask, updateTask } = useTasks()
  const { showSuccess, showError } = useToast()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [category, setCategory] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Populate or reset form when task prop changes
  useEffect(() => {
    if (task) {
      setTitle(task.title ?? '')
      setDescription(task.description ?? '')
      // Convert ISO string to YYYY-MM-DD for <input type="date">
      setDeadline(task.deadline ? task.deadline.slice(0, 10) : '')
      setCategory(task.category ?? '')
    } else {
      setTitle('')
      setDescription('')
      setDeadline('')
      setCategory('')
    }
    setErrors({})
  }, [task, isOpen])

  function validate() {
    const newErrors = {}

    if (!title.trim()) {
      newErrors.title = 'Judul wajib diisi.'
    }

    if (!deadline) {
      newErrors.deadline = 'Deadline wajib diisi.'
    } else {
      const parsed = new Date(deadline)
      if (isNaN(parsed.getTime())) {
        newErrors.deadline = 'Deadline tidak valid.'
      }
    }

    if (!category) {
      newErrors.category = 'Kategori wajib dipilih.'
    }

    return newErrors
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setLoading(true)

    // Convert date string to ISO string for the API
    const formData = {
      title: title.trim(),
      description: description.trim(),
      deadline: new Date(deadline).toISOString(),
      category,
    }

    try {
      if (task) {
        const savedTask = await updateTask(task._id, formData)
        showSuccess('Task berhasil diperbarui')
        onSaved?.(savedTask, true)
      } else {
        const savedTask = await createTask(formData)
        showSuccess('Task berhasil dibuat')
        onSaved?.(savedTask, false)
      }
      onClose()
    } catch (err) {
      const message =
        err?.response?.data?.message || 'Terjadi kesalahan. Coba lagi.'
      showError(message)
    } finally {
      setLoading(false)
    }
  }

  const modalTitle = task ? 'Edit Task' : 'Buat Task Baru'

  // Shared input styling for date and select (matches Input component appearance)
  const fieldBase =
    'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-colors'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={modalTitle}>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* Title */}
        <Input
          label="Judul"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
          placeholder="Masukkan judul task"
          required
        />

        {/* Description */}
        <Input
          label="Deskripsi"
          name="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Deskripsi (opsional)"
        />

        {/* Deadline */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="deadline"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Deadline
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            aria-invalid={!!errors.deadline}
            aria-describedby={errors.deadline ? 'deadline-error' : undefined}
            className={`${fieldBase} ${
              errors.deadline
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.deadline && (
            <p
              id="deadline-error"
              role="alert"
              className="text-xs text-red-500 mt-0.5"
            >
              {errors.deadline}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="category"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Kategori
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            aria-invalid={!!errors.category}
            aria-describedby={errors.category ? 'category-error' : undefined}
            className={`${fieldBase} ${
              errors.category
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value="">-- Pilih kategori --</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          {errors.category && (
            <p
              id="category-error"
              role="alert"
              className="text-xs text-red-500 mt-0.5"
            >
              {errors.category}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Batal
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Menyimpan...' : task ? 'Simpan Perubahan' : 'Buat Task'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
