import { createContext } from 'react'
import type { Dictionary } from '../data/locales/en'

type Language = 'en' | 'ar'

interface LanguageContextType {
  lang: Language
  toggleLang: () => void
  t: Dictionary
}

export const LanguageContext = createContext<LanguageContextType | null>(null)
