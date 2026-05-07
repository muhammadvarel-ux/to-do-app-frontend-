import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-700">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Halaman tidak ditemukan
        </p>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Halaman yang kamu cari tidak ada atau telah dipindahkan.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  )
}

export default NotFound
