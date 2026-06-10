import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useLanguage } from '../../hooks/useLanguage'
import { Sun, Moon, Globe, Zap } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const { toggleLang, t } = useLanguage()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section detection via IntersectionObserver
  const updateActiveSection = useCallback(() => {
    const sections = ['hero', 'services', 'how-it-works', 'roi-calculator', 'about']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    // Wait a bit for the page transition to finish before observing
    const timeout = setTimeout(() => {
      const cleanup = updateActiveSection()
      return cleanup
    }, 500)
    return () => clearTimeout(timeout)
  }, [updateActiveSection])

  // Handle anchor scrolling
  useEffect(() => {
    // Add small delay to let page transitions finish rendering the target element
    const timeout = setTimeout(() => {
      if (location.hash) {
        const el = document.getElementById(location.hash.replace('#', ''))
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 100)
    
    setMobileOpen(false)
    return () => clearTimeout(timeout)
  }, [location])

  const navLinks = [
    { to: '/#services', label: t.nav.services,  section: 'services' },
    { to: '/#about',    label: t.nav.about,     section: 'about' },
    { to: '/contact',   label: t.nav.contact,   section: '' },
  ]

  const isActive = (section: string) => section && activeSection === section

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'var(--bg-navbar)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link to="/" aria-label="EVOLIX AI — Home" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-brand"
            style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand-accent))' }}
          >
            <Zap size={18} color="#fff" strokeWidth={2.5} />
          </div>
          <span
            className="font-bold text-lg tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}
          >
            EVOLIX <span style={{ color: 'var(--brand)' }}>AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 list-none" role="list">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`text-sm font-medium relative py-1 transition-colors duration-200 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-brand after:transition-all after:duration-300 hover:after:w-full ${isActive(link.section) ? 'nav-link-active' : ''}`}
                style={{ color: isActive(link.section) ? 'var(--brand)' : 'var(--text-muted)' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="hidden sm:flex p-2 rounded-lg items-center gap-1.5 font-medium text-sm transition-all hover:scale-105"
            style={{ color: 'var(--text-muted)' }}
          >
            <Globe size={16} />
            <span>{t.nav.langToggle}</span>
          </button>

          <button
            onClick={toggle}
            aria-label={theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}
            className="p-2 rounded-lg transition-all hover:scale-110"
            style={{ color: 'var(--text-muted)' }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-brand active:scale-95"
            style={{ background: 'linear-gradient(135deg, var(--brand), var(--ai-indigo))' }}
          >
            {t.nav.getInTouch}
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: 'var(--text-primary)' }}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`h-0.5 bg-current rounded transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 bg-current rounded transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-current rounded transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(7, 7, 17, 0.95)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium py-2 transition-colors"
                  style={{ color: isActive(link.section) ? 'var(--brand)' : 'var(--text-muted)' }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Language toggle - now visible on mobile */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 py-2 text-sm font-medium transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                <Globe size={16} />
                {t.nav.langToggle}
              </button>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand-mid))' }}
              >
                {t.nav.getInTouch}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
