import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Zap } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'logo' | 'expand' | 'done'>('logo')

  useEffect(() => {
    // Phase 1: Logo animation plays (1.8s)
    const t1 = setTimeout(() => setPhase('expand'), 1800)
    // Phase 2: Expand & reveal (0.8s)
    const t2 = setTimeout(() => setPhase('done'), 2600)
    // Phase 3: Cleanup
    const t3 = setTimeout(() => onComplete(), 3200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: '#020205' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {/* Aurora mesh blobs behind logo */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: phase === 'expand' ? 8 : [0, 1.2, 1],
              opacity: phase === 'expand' ? 0 : [0, 0.8, 0.6],
            }}
            transition={{
              duration: phase === 'expand' ? 0.8 : 1.2,
              ease,
            }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 60%)',
              filter: 'blur(60px)',
              top: '30%',
              left: '60%',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: phase === 'expand' ? 6 : [0, 1, 0.9],
              opacity: phase === 'expand' ? 0 : [0, 0.5, 0.4],
            }}
            transition={{
              duration: phase === 'expand' ? 0.8 : 1.4,
              ease,
              delay: 0.2,
            }}
          />

          {/* Orbital ring */}
          <motion.div
            className="absolute w-48 h-48 rounded-full border pointer-events-none"
            style={{ borderColor: 'rgba(124,58,237,0.15)' }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              scale: phase === 'expand' ? 12 : [0, 1],
              opacity: phase === 'expand' ? 0 : [0, 0.4],
              rotate: phase === 'expand' ? 180 : [0, 90],
            }}
            transition={{ duration: phase === 'expand' ? 0.8 : 1.5, ease }}
          />
          <motion.div
            className="absolute w-72 h-72 rounded-full border pointer-events-none"
            style={{ borderColor: 'rgba(99,102,241,0.08)' }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              scale: phase === 'expand' ? 10 : [0, 1],
              opacity: phase === 'expand' ? 0 : [0, 0.25],
              rotate: phase === 'expand' ? -120 : [0, -60],
            }}
            transition={{ duration: phase === 'expand' ? 0.8 : 1.6, ease, delay: 0.1 }}
          />

          {/* Scanning line effect */}
          <motion.div
            className="absolute w-full h-px pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.5), rgba(6,182,212,0.3), transparent)',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: phase === 'expand' ? 0 : [0, 1],
              opacity: phase === 'expand' ? 0 : [0, 1, 0.6],
              y: phase === 'expand' ? -200 : [0, 0],
            }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
          />

          {/* Main Logo Container */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-4"
            animate={{
              scale: phase === 'expand' ? 1.5 : 1,
              opacity: phase === 'expand' ? 0 : 1,
            }}
            transition={{ duration: 0.6, ease }}
          >
            {/* Logo icon */}
            <motion.div
              className="relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            >
              {/* Glow ring behind icon */}
              <motion.div
                className="absolute inset-[-8px] rounded-2xl pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(6,182,212,0.3))',
                  filter: 'blur(12px)',
                }}
                animate={{
                  opacity: [0, 0.8, 0.5, 0.8],
                  scale: [0.8, 1.1, 1, 1.05],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  boxShadow: '0 0 40px rgba(124,58,237,0.5), 0 0 80px rgba(124,58,237,0.2)',
                }}
              >
                <Zap size={32} color="#fff" strokeWidth={2.5} />
              </div>
            </motion.div>

            {/* Brand name with letter-by-letter reveal */}
            <motion.div
              className="flex items-center gap-1 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              {'EVOLIX'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="text-3xl font-black tracking-tight"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: '#ededef',
                  }}
                  initial={{ opacity: 0, y: 20, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + i * 0.08,
                    ease,
                  }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                className="text-3xl font-black tracking-tight ml-2"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 15,
                  delay: 1.1,
                }}
              >
                AI
              </motion.span>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-32 h-0.5 rounded-full overflow-hidden mt-2"
              style={{ background: 'rgba(255,255,255,0.06)' }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.3, ease }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
                  transformOrigin: 'left',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 1.3,
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            </motion.div>
          </motion.div>

          {/* Corner decorative lines */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'expand' ? 0 : 0.3 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, rgba(124,58,237,0.4), transparent)' }} />
            <div className="absolute top-0 left-0 w-px h-full" style={{ background: 'linear-gradient(180deg, rgba(124,58,237,0.4), transparent)' }} />
          </motion.div>
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'expand' ? 0 : 0.3 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <div className="absolute bottom-0 right-0 w-full h-px" style={{ background: 'linear-gradient(270deg, rgba(6,182,212,0.4), transparent)' }} />
            <div className="absolute bottom-0 right-0 w-px h-full" style={{ background: 'linear-gradient(0deg, rgba(6,182,212,0.4), transparent)' }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
