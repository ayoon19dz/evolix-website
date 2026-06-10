import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Calculator, Clock, TrendingUp } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import { Link } from 'react-router-dom'

function AnimatedNumber({ value }: { value: number }) {
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 1200, bounce: 0 })
  const rounded = useTransform(springValue, (latest) => Math.round(latest))

  useEffect(() => {
    motionValue.set(value)
  }, [motionValue, value])

  return <motion.span>{rounded}</motion.span>
}

export default function ROICalculatorSection() {
  const { t } = useLanguage()
  const ease = [0.16, 1, 0.3, 1] as const

  const [teamSize, setTeamSize] = useState(10)
  const [hoursManual, setHoursManual] = useState(15)

  const hoursSavedPerMonth = teamSize * hoursManual * 4
  const moneySaved = Math.round(hoursSavedPerMonth * 25) // ~$25/hr avg

  return (
    <section
      id="roi-calculator"
      className="py-20 px-6 relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Background decorations */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', color: 'var(--brand)' }}
          >
            <Calculator size={12} />
            {t.roi.estimator}
          </div>
          <h2
            className="text-4xl md:text-6xl font-black mb-5 tracking-tight"
            style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}
          >
            {t.roi.title}
          </h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t.roi.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="p-8 rounded-3xl flex flex-col gap-8"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Team Size */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
                  {t.roi.teamSize}
                </label>
                <span
                  className="text-2xl font-black gradient-text"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {teamSize}
                </span>
              </div>
              <input
                type="range" min="1" max="100" value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full cursor-pointer"
                dir="ltr"
                aria-label={t.roi.teamSize}
                aria-valuemin={1}
                aria-valuemax={100}
                aria-valuenow={teamSize}
                style={{
                  accentColor: 'var(--brand)',
                  height: '4px',
                }}
              />
              <div className="flex justify-between text-xs" style={{ color: 'var(--text-subtle)' }}>
                <span>1</span><span>100</span>
              </div>
            </div>

            {/* Manual Hours */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
                  {t.roi.hoursManual}
                </label>
                <span
                  className="text-2xl font-black gradient-text"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {hoursManual}h
                </span>
              </div>
              <input
                type="range" min="1" max="40" value={hoursManual}
                onChange={(e) => setHoursManual(Number(e.target.value))}
                className="w-full cursor-pointer"
                dir="ltr"
                aria-label={t.roi.hoursManual}
                aria-valuemin={1}
                aria-valuemax={40}
                aria-valuenow={hoursManual}
                style={{ accentColor: 'var(--brand)', height: '4px' }}
              />
              <div className="flex justify-between text-xs" style={{ color: 'var(--text-subtle)' }}>
                <span>1h</span><span>40h</span>
              </div>
            </div>

            {/* Summary row */}
            <div className="pt-4 border-t flex gap-4" style={{ borderColor: 'var(--glass-border)' }}>
              <div className="flex-1 text-center p-3 rounded-2xl" style={{ background: 'rgba(124,58,237,0.08)' }}>
                <div className="text-xs mb-1" style={{ color: 'var(--text-subtle)' }}>{t.roi.teamSize}</div>
                <div className="font-bold" style={{ color: 'var(--brand)' }}>{teamSize} {t.roi.people}</div>
              </div>
              <div className="flex-1 text-center p-3 rounded-2xl" style={{ background: 'rgba(6,182,212,0.08)' }}>
                <div className="text-xs mb-1" style={{ color: 'var(--text-subtle)' }}>{t.roi.wastedPerWeek}</div>
                <div className="font-bold" style={{ color: 'var(--brand-accent)' }}>{hoursManual}h</div>
              </div>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="relative p-10 rounded-3xl flex flex-col justify-between overflow-hidden"
            aria-live="polite"
            aria-atomic="true"
            style={{
              background: 'linear-gradient(145deg, rgba(124,58,237,0.12), rgba(99,102,241,0.06))',
              border: '1px solid rgba(124,58,237,0.3)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              minHeight: '340px',
            }}
          >
            {/* Glowing orb */}
            <div
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, rgba(124,58,237,0.3) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" aria-hidden="true" />

            {/* Hours saved */}
            <div className="relative z-10 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} style={{ color: 'var(--brand-accent)' }} />
                <span className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
                  {t.roi.results.hoursSaved}
                </span>
              </div>
              <div
                className="text-6xl md:text-7xl font-black gradient-text flex items-end gap-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                dir="ltr"
              >
                <AnimatedNumber value={hoursSavedPerMonth} />
                <span className="text-3xl font-bold mb-2" style={{ color: 'var(--text-muted)' }}>{t.roi.hoursSavedUnit}</span>
              </div>
            </div>

            {/* Money saved estimate */}
            <div className="relative z-10 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} style={{ color: 'var(--ai-green)' }} />
                <span className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
                  {t.roi.costSavings}
                </span>
              </div>
              <div
                className="text-3xl font-black"
                style={{ color: 'var(--ai-green)', fontFamily: "'Space Grotesk', sans-serif" }}
                dir="ltr"
              >
                ~${' '}<AnimatedNumber value={moneySaved} /><span className="text-lg font-bold">{t.roi.perMonth}</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/contact"
              className="relative z-10 w-full py-4 rounded-2xl font-bold text-base transition-all hover:scale-[1.02] active:scale-95 text-center inline-block"
              style={{
                background: 'linear-gradient(135deg, var(--brand), var(--brand-mid))',
                color: '#fff',
                boxShadow: '0 10px 30px rgba(124,58,237,0.35)',
              }}
            >
              {t.roi.cta}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
