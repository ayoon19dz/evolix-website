import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme'
import { LanguageProvider } from './hooks/useLanguage'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'
import CustomCursor from './components/ui/CustomCursor'
import IntroAnimation from './components/ui/IntroAnimation'
import { useState, useCallback } from 'react'

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const handleIntroComplete = useCallback(() => setIntroComplete(true), [])

  return (
    <LanguageProvider>
      <ThemeProvider>
        {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}
        <div style={{ opacity: introComplete ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          <BrowserRouter>
            <CustomCursor />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App

