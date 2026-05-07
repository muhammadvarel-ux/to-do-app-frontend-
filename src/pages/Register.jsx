import AuthLayout from '../components/auth/AuthLayout.jsx'
import RegisterForm from '../components/auth/RegisterForm.jsx'

/**
 * Register page — renders the centered auth layout with the registration form.
 *
 * Requirements: 2.1, 2.6, 9.3
 */
export default function Register() {
  return (
    <AuthLayout title="Daftar">
      <RegisterForm />
    </AuthLayout>
  )
}
