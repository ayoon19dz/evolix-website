import { createContext } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggle: () => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)
