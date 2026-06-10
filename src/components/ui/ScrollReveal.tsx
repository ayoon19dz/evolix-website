import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface ScrollRevealProps {
  children: ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  distance?: number
  className?: string
  margin?: string
  once?: boolean
}

const directionOffset: Record<Direction, { x: number; y: number }> = {
  up:    { x: 0, y: 40 },
  down:  { x: 0, y: -40 },
  left:  { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none:  { x: 0, y: 0 },
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 40,
  className,
  margin = '-60px',
  once = true,
}: ScrollRevealProps) {
  const offset = directionOffset[direction]
  const factor = distance / 40

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: offset.x * factor,
        y: offset.y * factor,
        scale: 0.97,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once, margin }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  className,
  margin = '-80px',
  once = true,
}: {
  children: ReactNode
  staggerDelay?: number
  className?: string
  margin?: string
  once?: boolean
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: staggerDelay, delayChildren: 0.1 },
        },
      }}
    >
      {children}
    </motion.div>
  )
}



