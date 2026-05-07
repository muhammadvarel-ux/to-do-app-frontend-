import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext.jsx'

/**
 * Hook to consume ThemeContext.
 * Must be used inside a ThemeProvider.
 */
export default function useTheme() {
  return useContext(ThemeContext)
}
