import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { ToastProvider } from './contexts/ToastContext.jsx'
import { TaskProvider } from './contexts/TaskContext.jsx'
import { SocketProvider } from './contexts/SocketContext.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import Loader from './components/common/Loader.jsx'
import Toast from './components/common/Toast.jsx'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Board from './pages/Board'
import NotFound from './pages/NotFound'

function App() {
  // Show the loading screen for 1.5 seconds on initial app load (Requirement 1.1)
  const [appLoading, setAppLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setAppLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <SocketProvider>
              <TaskProvider>
                {/* Loader is rendered outside the route tree so it overlays everything (Requirement 1.3, 1.4) */}
                <AnimatePresence>
                  {appLoading && <Loader isLoading={appLoading} />}
                </AnimatePresence>

                {/* Toast renders globally inside ToastProvider, outside Routes (Requirement 9.1–9.4) */}
                <Toast />

                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/board/:id"
                    element={
                      <ProtectedRoute>
                        <Board />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </TaskProvider>
            </SocketProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
