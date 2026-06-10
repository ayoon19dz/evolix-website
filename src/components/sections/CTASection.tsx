import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Sparkles, Zap } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

function CtaParallaxBg() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px]"
        style={{
          y,
          background: 'radial-gradient(ellipse, rgba(var(--brand-rgb),0.15) 0%, rgba(99,102,241,0.08) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0 bg-dot-pattern opacity-15"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['-6%', '6%']) }}
        aria-hidden="true"
      />
    </div>
  )
}

export default function CTASection() {
  const { t, lang } = useLanguage()
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight
  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <CtaParallaxBg />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        {/* Glass card with animated border */}
        <motion.div
          className="relative p-12 md:p-16 rounded-4xl text-center overflow-hidden card-hover-glow"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          {/* Animated corner glows */}
          <motion.div
            className="absolute top-0 left-0 w-48 h-48 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(var(--brand-rgb),0.2) 0%, transparent 70%)' }}
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(6,182,212,0.15) 0%, transparent 70%)' }}
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.3, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            aria-hidden="true"
          />

          {/* Badge with shimmer */}
          <motion.div
            className="relative z-10 flex justify-center mb-6"
            initial={{ opacity: 0, y: 16, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase shimmer-badge"
              style={{ background: 'rgba(var(--brand-rgb),0.1)', border: '1px solid rgba(var(--brand-rgb),0.25)', color: 'var(--brand)' }}
            >
              <Sparkles size={12} />
              {t.common.getStarted}
            </div>
          </motion.div>

          <motion.h2
            className="relative z-10 text-4xl md:text-5xl font-black mb-6 tracking-tight"
            style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            {t.cta.title}
          </motion.h2>
          <motion.p
            className="relative z-10 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            {t.cta.description}
          </motion.p>

          {/* CTA Button with animated gradient */}
          <motion.div
            className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <Link
                to="/contact"
                className="group glow-pulse inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl text-lg font-bold animated-gradient"
                style={{
                  background: 'linear-gradient(135deg, var(--brand) 0%, var(--ai-indigo) 50%, var(--brand) 100%)',
                  backgroundSize: '200% 200%',
                  color: '#fff',
                  boxShadow: '0 0 40px rgba(var(--brand-rgb),0.35), 0 12px 32px rgba(0,0,0,0.3)',
                }}
              >
                <Zap size={20} strokeWidth={2.5} />
                {t.cta.button}
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Arrow size={20} />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
