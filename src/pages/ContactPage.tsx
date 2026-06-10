import { useEffect } from 'react'
import ContactCards from '../components/sections/ContactCards'
import { useLanguage } from '../hooks/useLanguage'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import PageTransition from '../components/ui/PageTransition'

export default function ContactPage() {
  const { t } = useLanguage()
  const ease = [0.16, 1, 0.3, 1] as const

  useEffect(() => {
    document.title = `${t.nav.contact} — EVOLIX AI`
  }, [t])

  return (
    <PageTransition>
    <div className="flex flex-col w-full min-h-[calc(100vh-64px)] relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Aurora background */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.06) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none z-0" aria-hidden="true" />

      {/* Contact Hero */}
      <section className="py-24 px-6 text-center relative z-10">
        <div className="max-w-3xl mx-auto mt-8">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex justify-center mb-6"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', color: 'var(--brand)' }}
            >
              <Sparkles size={12} />
              {t.common.contactUs}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="text-5xl md:text-6xl font-black mb-6 tracking-tight"
            style={{
              color: 'var(--text-primary)',
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '-0.03em',
            }}
          >
            {t.contactPage.titleLine1}{' '}
            <span className="gradient-text">{t.contactPage.titleLine2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="text-xl leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {t.contactPage.description}
          </motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-24 px-6 flex-grow flex items-start justify-center relative z-10">
        <ContactCards />
      </section>
    </div>
    </PageTransition>
  )
}
