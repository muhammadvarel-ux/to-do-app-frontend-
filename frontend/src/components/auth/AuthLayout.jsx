/**
 * AuthLayout — centered layout wrapper for authentication pages.
 *
 * Props:
 *   title    {string}    — heading displayed at the top of the card
 *   children {ReactNode} — form content
 *
 * Requirements: 2.1, 2.3
 */
export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md">
        {title && (
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {title}
          </h1>
        )}
        {children}
      </div>
    </div>
  )
}
