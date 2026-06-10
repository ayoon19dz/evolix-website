import { useLanguage } from '../../hooks/useLanguage'
import { Brain, Cpu, Zap, Sparkles } from 'lucide-react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

// 3D Tilt Card component
function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    rotateX.set(-mouseY / 20)
    rotateY.set(mouseX / 20)
    x.set(mouseX / 30)
    y.set(mouseY / 30)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        rotateX,
        rotateY,
        x,
        y,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ParallaxBg() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div className="absolute inset-0 bg-dot-pattern opacity-10" style={{ y }} />
      <motion.div className="absolute inset-0 cyber-grid opacity-30" style={{ y: useTransform(scrollYProgress, [0, 1], ['-5%', '5%']) }} />
    </div>
  )
}

export default function ServicesSection() {
  const { t } = useLanguage()

  const services = [
    {
      id: 'ai-predictive',
      icon: Brain,
      title: t.services.items.aiServices.title,
      description: t.services.items.aiServices.desc,
      image: '/assets/predictive.png',
      color: 'rgba(124,58,237,0.4)',
      span: 'lg:col-span-8 col-span-12',
    },
    {
      id: 'automation',
      icon: Cpu,
      title: t.services.items.automation.title,
      description: t.services.items.automation.desc,
      image: '/assets/automation.png',
      color: 'rgba(6,182,212,0.4)',
      span: 'lg:col-span-4 col-span-12',
    },
    {
      id: 'ai-agents',
      icon: Zap,
      title: t.services.items.aiAgents.title,
      description: t.services.items.aiAgents.desc,
      image: '/assets/agents.png',
      color: 'rgba(99,102,241,0.4)',
      span: 'col-span-12',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  return (
    <section
      id="services"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <ParallaxBg />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 shimmer-badge"
            style={{ background: 'rgba(var(--brand-rgb),0.1)', border: '1px solid rgba(var(--brand-rgb),0.2)', color: 'var(--brand)' }}
          >
            <Sparkles size={12} />
            {t.nav.services}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            {t.services.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto text-lg"
            style={{ color: 'var(--text-muted)' }}
          >
            {t.services.description}
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="bento-grid"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={`${service.span}`}
              >
                <TiltCard
                  className="relative group overflow-hidden rounded-3xl p-8 lg:p-10 transition-all duration-500 h-full card-hover-glow"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    backdropFilter: 'blur(var(--glass-blur))',
                  }}
                >
                  {/* Wireframe/Tech Background Asset */}
                  <div 
                    className="absolute inset-0 z-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500"
                    style={{
                      backgroundImage: `radial-gradient(var(--brand) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px',
                    }}
                  />
                  
                  {/* Hover Tech Glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 100% 100%, ${service.color} 0%, transparent 60%)`,
                    }}
                  />

                  {/* Corner Accent Line */}
                  <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[var(--brand)] to-transparent" />
                    <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-[var(--brand)] to-transparent" />
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-8">
                      <motion.div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{ background: 'rgba(var(--brand-rgb), 0.1)', border: '1px solid rgba(var(--brand-rgb), 0.3)' }}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      >
                        <Icon size={32} style={{ color: 'var(--brand-accent)' }} />
                      </motion.div>
                      
                      <div className="text-xs font-mono font-bold tracking-widest opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--brand)' }}>
                        SYS.{service.id.toUpperCase()}
                      </div>
                    </div>
                    
                    <h3
                      className="text-3xl font-black mb-4 tracking-tight"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {service.title}
                    </h3>
                    
                    <p className="leading-relaxed flex-grow text-base md:text-lg" style={{ color: 'var(--text-muted)' }}>
                      {service.description}
                    </p>
                    
                    <Link
                      to="/contact"
                      className="mt-8 flex items-center gap-2 text-sm font-bold group/link cursor-pointer inline-flex w-fit font-mono tracking-wide uppercase"
                      style={{ color: 'var(--brand-accent)' }}
                    >
                      <span className="group-hover/link:underline underline-offset-4">{t.common.learnMore}</span>
                      <motion.span
                        animate={{ x: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
