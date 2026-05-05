import AuthLayout from '../components/auth/AuthLayout.jsx'
import LoginForm from '../components/auth/LoginForm.jsx'

/**
 * Login page — renders the centered auth layout with the login form.
 *
 * Requirements: 2.3, 2.6, 9.3
 */
export default function Login() {
  return (
    <AuthLayout title="Masuk">
      <LoginForm />
    </AuthLayout>
  )
}
