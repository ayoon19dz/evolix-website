import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import { Award, TrendingUp, Users, Sparkles } from 'lucide-react'

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const motionValue = useMotionValue(from)
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 })
  const rounded = useTransform(springValue, (latest) => Math.round(latest))

  useEffect(() => {
    motionValue.set(to)
  }, [motionValue, to])

  return <motion.span>{rounded}</motion.span>
}

const statCards = [
  { prefix: '+', value: 50, suffix: '', icon: Award,      gradient: 'from-[#7c3aed] to-[#6366f1]', glow: 'rgba(124,58,237,0.3)', key: 'projects' },
  { prefix: 'x', value: 10, suffix: '', icon: TrendingUp, gradient: 'from-[#06b6d4] to-[#0ea5e9]', glow: 'rgba(6,182,212,0.3)',   key: 'roi' },
  { prefix: '',  value: 99, suffix: '%', icon: Users,     gradient: 'from-[#10b981] to-[#059669]', glow: 'rgba(16,185,129,0.3)',  key: 'satisfaction', wide: true },
]

function AboutParallaxBg() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ['-10%', '10%']),
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(var(--brand-rgb),0.06) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0 bg-dot-pattern opacity-20"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['-5%', '5%']) }}
        aria-hidden="true"
      />
    </div>
  )
}

export default function AboutSection() {
  const { t } = useLanguage()
  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <section
      id="about"
      className="py-20 px-6 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
      aria-label="About EVOLIX AI"
    >
      <AboutParallaxBg />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="flex justify-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase shimmer-badge"
            style={{
              background: 'rgba(var(--brand-rgb),0.08)',
              border: '1px solid rgba(var(--brand-rgb),0.2)',
              color: 'var(--brand)',
            }}
          >
            <Sparkles size={12} />
            {t.common.aboutUs}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Mission & Values */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease }}
          >
            <h2
              className="text-4xl md:text-5xl font-black mb-6 tracking-tight"
              style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}
            >
              {t.about.title}
            </h2>
            <p
              className="text-lg mb-8 leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              {t.about.description}
            </p>

            {/* Value pills with staggered animation */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {t.about.values.map(value => (
                <motion.span
                  key={value}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 12 },
                    visible: { opacity: 1, scale: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="px-4 py-2 rounded-full text-sm font-semibold cursor-default"
                  style={{
                    background: 'rgba(var(--brand-rgb),0.08)',
                    border: '1px solid rgba(var(--brand-rgb),0.2)',
                    color: 'var(--brand)',
                  }}
                >
                  {value}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Stats Bento Grid */}
          <div className="grid grid-cols-2 gap-4">
            {statCards.map((stat, idx) => {
              const Icon = stat.icon
              const statLabel = t.about.stats[stat.key as keyof typeof t.about.stats]
              return (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.15, ease }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  className={`group relative p-7 rounded-3xl flex flex-col items-center justify-center text-center overflow-hidden card-hover-glow ${stat.wide ? 'col-span-2' : ''}`}
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Animated hover glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${stat.glow} 0%, transparent 70%)` }}
                    initial={false}
                    animate={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Icon with spring animation */}
                  <motion.div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${stat.gradient}`}
                    style={{ boxShadow: `0 8px 20px ${stat.glow}` }}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <Icon size={20} color="#fff" />
                  </motion.div>

                  {/* Number with count-up */}
                  <span
                    className="text-4xl md:text-5xl font-black mb-2 flex items-center justify-center gap-0.5 gradient-text"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    dir="ltr"
                  >
                    {stat.prefix}
                    <Counter from={0} to={stat.value} />
                    {stat.suffix}
                  </span>

                  <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                    {statLabel}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
