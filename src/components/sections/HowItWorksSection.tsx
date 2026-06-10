import { motion } from 'framer-motion'
import { Search, Cog, TrendingUp, Sparkles } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'

const stepColors = [
  { bg: 'from-[#7c3aed] to-[#6366f1]', glow: 'rgba(124,58,237,0.35)', num: '01' },
  { bg: 'from-[#06b6d4] to-[#0ea5e9]', glow: 'rgba(6,182,212,0.35)',   num: '02' },
  { bg: 'from-[#10b981] to-[#059669]', glow: 'rgba(16,185,129,0.35)',  num: '03' },
]

export default function HowItWorksSection() {
  const { t, lang } = useLanguage()
  const ease = [0.16, 1, 0.3, 1] as const

  const steps = [
    { id: 'step-1', icon: Search,     title: t.howItWorks.steps.analyze.title,  desc: t.howItWorks.steps.analyze.desc },
    { id: 'step-2', icon: Cog,        title: t.howItWorks.steps.automate.title, desc: t.howItWorks.steps.automate.desc },
    { id: 'step-3', icon: TrendingUp, title: t.howItWorks.steps.scale.title,    desc: t.howItWorks.steps.scale.desc },
  ]

  return (
    <section
      id="how-it-works"
      className="py-20 px-6 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Subtle center glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(var(--brand-rgb),0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 shimmer-badge"
            style={{ background: 'rgba(var(--brand-rgb),0.08)', border: '1px solid rgba(var(--brand-rgb),0.2)', color: 'var(--brand)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            <Sparkles size={12} />
            {t.common.ourProcess}
          </motion.div>
          <h2
            className="text-4xl md:text-6xl font-black mb-5 tracking-tight"
            style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}
          >
            {t.howItWorks.title}
          </h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t.howItWorks.description}
          </p>
        </motion.div>

        {/* Steps */}
        <div className={`relative grid grid-cols-1 md:grid-cols-3 gap-8 ${lang === 'ar' ? 'direction-rtl' : ''}`}>
          {/* Animated connector line */}
          <motion.div
            className="hidden md:block absolute top-[52px] left-[calc(16.6%+44px)] right-[calc(16.6%+44px)] h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, rgba(124,58,237,0.5), rgba(6,182,212,0.5), rgba(16,185,129,0.5))' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease }}
            aria-hidden="true"
          />

          {steps.map((step, idx) => {
            const Icon = step.icon
            const colors = stepColors[idx]
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: idx * 0.2, ease }}
                whileHover={{ y: -8 }}
                className="group flex flex-col items-center text-center"
              >
                {/* Step icon circle with pulse ring */}
                <div className="relative mb-8">
                  <motion.div
                    className={`w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br ${colors.bg}`}
                    style={{ boxShadow: `0 0 0 8px rgba(2,2,3,1), 0 0 40px ${colors.glow}` }}
                    whileHover={{ scale: 1.12, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <Icon size={34} color="#fff" strokeWidth={1.8} />
                  </motion.div>
                  {/* Pulse ring on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ border: `2px solid ${colors.glow}` }}
                    initial={{ scale: 1, opacity: 0 }}
                    whileInView={{
                      scale: [1, 1.6],
                      opacity: [0.5, 0],
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 + idx * 0.2, ease: 'easeOut' }}
                  />
                  {/* Step number */}
                  <motion.span
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full text-xs font-black flex items-center justify-center"
                    style={{
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-subtle)',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.4 + idx * 0.2 }}
                  >
                    {colors.num}
                  </motion.span>
                </div>

                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="leading-relaxed text-sm max-w-xs" style={{ color: 'var(--text-muted)' }}>
                  {step.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
