import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'
import useToast from '../../hooks/useToast.js'
import Input from '../common/Input.jsx'
import Button from '../common/Button.jsx'
import { validateEmail, validatePassword } from '../../utils/validators.js'

/**
 * LoginForm — form for user login with client-side validation.
 *
 * - Validates email and password before submitting
 * - Calls useAuth().login(), stores JWT via AuthContext
 * - Shows welcome toast on success and redirects to /
 * - Displays API error messages on failure
 *
 * Requirements: 2.3, 2.6, 9.3
 */
export default function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { showSuccess, showError } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const newErrors = {}

    if (!email.trim()) {
      newErrors.email = 'Email wajib diisi.'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Format email tidak valid.'
    }

    if (!password) {
      newErrors.password = 'Password wajib diisi.'
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password minimal 6 karakter.'
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

    try {
      await login(email, password)
      showSuccess('Selamat datang!')
      navigate('/')
    } catch (err) {
      const message =
        err?.response?.data?.message || 'Login gagal. Periksa kembali kredensial Anda.'
      showError(message)
      setErrors({ api: message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Input
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        placeholder="nama@email.com"
        required
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        placeholder="Minimal 6 karakter"
        required
      />

      {errors.api && (
        <p role="alert" className="text-sm text-red-500 text-center">
          {errors.api}
        </p>
      )}

      <Button type="submit" disabled={loading} className="w-full mt-2">
        {loading ? 'Memproses...' : 'Masuk'}
      </Button>

      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
        Belum punya akun?{' '}
        <Link
          to="/register"
          className="text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Daftar sekarang
        </Link>
      </p>
    </form>
  )
}
