import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { motion } from 'framer-motion'

export default function NotFound() {
  const { t, lang } = useLanguage()
  const Arrow = lang === 'ar' ? ArrowRight : ArrowLeft
  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 text-center overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Aurora glow background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, rgba(99,102,241,0.08) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" aria-hidden="true" />

      {/* 404 Number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease }}
        className="relative z-10 mb-4"
      >
        <span
          className="text-[180px] font-black leading-none gradient-text select-none"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          404
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease }}
        className="relative z-10 text-2xl font-bold mb-4"
        style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {t.notFound.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.25, ease }}
        className="relative z-10 text-lg mb-10 max-w-md leading-relaxed"
        style={{ color: 'var(--text-muted)' }}
      >
        {t.notFound.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease }}
        className="relative z-10"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-white transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, var(--brand), var(--brand-mid))',
            boxShadow: '0 0 30px rgba(124,58,237,0.35)',
          }}
        >
          <Arrow size={18} />
          {t.notFound.button}
        </Link>
      </motion.div>
    </div>
  )
}
