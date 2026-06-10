import { createContext, useContext, useEffect, useState } from 'react'
import { en } from '../data/locales/en'
import type { Dictionary } from '../data/locales/en'
import { ar } from '../data/locales/ar'

type Language = 'en' | 'ar'

interface LanguageContextType {
  lang: Language
  toggleLang: () => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(
    () => (localStorage.getItem('evolix-lang') as Language) ?? 'en'
  )

  useEffect(() => {
    // Update HTML attributes for RTL/LTR support
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dir = dir
    document.documentElement.lang = lang
    localStorage.setItem('evolix-lang', lang)
  }, [lang])

  const t = lang === 'ar' ? ar : en

  return (
    <LanguageContext.Provider value={{ lang, toggleLang: () => setLang(l => l === 'en' ? 'ar' : 'en'), t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)!
