import Navbar from './Navbar'

/**
 * MainLayout wraps all authenticated pages with the Navbar and a consistent
 * page background that respects dark mode.
 * Requirements: 10.4, 13.1
 *
 * @param {{ children: React.ReactNode }} props
 */
export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
