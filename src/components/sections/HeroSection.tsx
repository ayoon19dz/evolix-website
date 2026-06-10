import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, ChevronDown, Terminal, Code, Play } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import MagneticButton from '../ui/MagneticButton'
import { useEffect, useState, useRef } from 'react'

// Typewriter that cycles through AI-related words with smooth slide animation
function AnimatedWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter')

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase('exit')
      setTimeout(() => {
        setIndex(i => (i + 1) % words.length)
        setPhase('enter')
      }, 400)
    }, 2800)
    return () => clearInterval(interval)
  }, [words.length])

  if (!words || words.length === 0) return null;

  return (
    <motion.span
      className="gradient-text inline-block min-h-[1.2em] relative"
      animate={{
        opacity: phase === 'enter' ? 1 : 0,
        y: phase === 'enter' ? 0 : -16,
        scale: phase === 'enter' ? 1 : 0.95,
        filter: phase === 'enter' ? 'blur(0px)' : 'blur(4px)',
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {words[index]}
    </motion.span>
  )
}

const FULL_LINES = [
  '> initializing neural_engine.sh',
  '> loading AI models...',
  '> optimizing business workflows...',
  '> EVOLIX systems ONLINE 🟢',
  '> await connect()'
]

function TerminalWidget() {
  const [lines, setLines] = useState<string[]>([])

  useEffect(() => {
    let currentLine = 0
    const interval = setInterval(() => {
      if (currentLine < FULL_LINES.length) {
        const nextLine = FULL_LINES[currentLine]
        if (nextLine) {
          setLines(prev => [...prev, nextLine])
        }
        currentLine++
      } else {
        clearInterval(interval)
      }
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      className="terminal-window w-full max-w-xl mx-auto lg:ml-auto"
      initial={{ opacity: 0, x: 50, rotateY: -15 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 1, delay: 0.5, type: 'spring' }}
      style={{ perspective: 1000 }}
    >
      <div className="terminal-header">
        <div className="flex gap-2">
          <div className="terminal-dot" />
          <div className="terminal-dot" />
          <div className="terminal-dot" />
        </div>
        <div className="mx-auto text-xs font-mono text-[var(--text-subtle)] flex items-center gap-2">
          <Terminal size={12} />
          system@evolix: ~
        </div>
      </div>
      <div className="terminal-body min-h-[200px]">
        {lines.map((line, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 5 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 flex items-start gap-2"
          >
            <span className="text-[var(--brand)] opacity-70">➜</span>
            <span className={line?.includes('ONLINE') ? 'text-[#27c93f]' : ''}>{line}</span>
          </motion.div>
        ))}
        {lines.length < FULL_LINES.length && (
          <div className="terminal-cursor" />
        )}
      </div>
    </motion.div>
  )
}

// Floating AI status badge with shimmer
function AiBadge() {
  const { t } = useLanguage()
  return (
    <motion.div
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide mb-8 shimmer-badge w-fit"
      style={{
        background: 'rgba(var(--brand-rgb), 0.1)',
        border: '1px solid rgba(var(--brand-rgb), 0.25)',
        color: 'var(--brand)',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="flex gap-1 items-center">
        <span className="typing-dot w-1.5 h-1.5 rounded-full bg-current" />
        <span className="typing-dot w-1.5 h-1.5 rounded-full bg-current" />
        <span className="typing-dot w-1.5 h-1.5 rounded-full bg-current" />
      </span>
      {t.hero?.aiBadge}
    </motion.div>
  )
}

export default function HeroSection() {
  const { t, lang } = useLanguage()
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight
  const ease = [0.16, 1, 0.3, 1] as const
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const heroStats = [
    { num: '50+', label: t.hero?.stats?.projects },
    { num: '10x', label: t.hero?.stats?.roi },
    { num: '99%', label: t.hero?.stats?.satisfaction },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 pb-12"
      style={{ background: 'var(--bg-primary)' }}
      aria-labelledby="hero-heading"
    >
      {/* Cyber Grid Interactive Background */}
      <div className="cyber-grid" />
      <div className="cyber-grid-overlay" />
      
      {/* Deep OLED Accent Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(var(--brand-rgb),0.15)_0%,transparent_60%)] filter blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_60%)] filter blur-[60px] pointer-events-none" />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center"
        style={{ opacity: contentOpacity, y: contentY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Typography Side */}
        <div className={`flex flex-col ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <motion.div variants={itemVariants}>
            <AiBadge />
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight"
            style={{
              color: 'var(--text-primary)',
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '-0.03em',
            }}
          >
            {t.hero?.titleLine1}
            <br className="hidden md:block" />
            <span className="gradient-text">{t.hero?.titleLine2}</span>
            {" "}
            <AnimatedWord words={t.hero?.words} />
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl mb-12 max-w-xl leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {t.hero?.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className={`flex flex-col sm:flex-row gap-4 ${lang === 'ar' ? 'justify-start' : 'justify-start'}`}
          >
            <MagneticButton>
              <a
                href="#services"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:scale-105 active:scale-95 animated-gradient"
                style={{
                  background: 'linear-gradient(135deg, var(--brand) 0%, var(--ai-indigo) 100%)',
                  backgroundSize: '200% 200%',
                  color: '#fff',
                  boxShadow: '0 0 30px rgba(var(--brand-rgb),0.35), 0 8px 24px rgba(0,0,0,0.3)',
                }}
              >
                <Code size={20} strokeWidth={2.5} />
                {t.hero.explore}
              </a>
            </MagneticButton>

            <MagneticButton>
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: 'rgba(var(--brand-rgb), 0.05)',
                  border: '1px solid rgba(var(--brand-rgb), 0.2)',
                  color: 'var(--text-primary)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Play size={18} className="text-[var(--brand)]" />
                {t.hero.contact}
                <Arrow size={18} className="transition-transform duration-300 group-hover:translate-x-1 opacity-50" />
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className={`mt-16 flex flex-wrap gap-8 ${lang === 'ar' ? 'justify-start' : 'justify-start'}`}
          >
            {heroStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + idx * 0.15, ease }}
                className="flex flex-col"
              >
                <div className="text-3xl font-black gradient-text font-mono">
                  {stat.num}
                </div>
                <div className="text-xs mt-2 tracking-widest uppercase font-semibold" style={{ color: 'var(--text-subtle)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Terminal Side */}
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center lg:justify-end">
          <TerminalWidget />
          
          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 flex gap-2 opacity-30">
            <div className="w-1 h-1 bg-[var(--brand)] rounded-full" />
            <div className="w-1 h-1 bg-[var(--brand)] rounded-full" />
            <div className="w-1 h-1 bg-[var(--brand)] rounded-full" />
          </div>
          <div className="absolute bottom-10 left-10 flex gap-2 opacity-30">
            <div className="w-8 h-[1px] bg-[var(--brand-accent)]" />
            <div className="w-4 h-[1px] bg-[var(--brand-accent)]" />
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
        style={{ color: 'var(--text-subtle)' }}
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} className="text-[var(--brand)] opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  )
}
