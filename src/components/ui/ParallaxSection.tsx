import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
  id?: string
}

export default function ParallaxSection({
  children,
  speed = 0.15,
  className,
  id,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100])

  return (
    <section ref={ref} id={id} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </section>
  )
}
