import { useRef, useState, useCallback, useLayoutEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [pageHeight, setPageHeight] = useState(0)

  const resizePageHeight = useCallback((entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
      setPageHeight(entry.contentRect.height)
    }
  }, [])

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => resizePageHeight(entries))
    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current)
    }
    return () => resizeObserver.disconnect()
  }, [scrollRef, resizePageHeight])

  const { scrollY } = useScroll()
  const transform = useTransform(scrollY, [0, pageHeight], [0, -pageHeight])
  const physics = { damping: 15, mass: 0.27, stiffness: 55 }
  const spring = useSpring(transform, physics)

  return (
    <>
      <motion.div
        ref={scrollRef}
        style={{ y: spring }}
        className="w-full fixed top-0 left-0 overflow-hidden"
      >
        {children}
      </motion.div>
      <div style={{ height: pageHeight }} />
    </>
  )
}
