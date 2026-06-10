import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show on devices with a fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Check if we are hovering over an interactive element
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea'
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }
    
    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ backgroundColor: '#fff' }}
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      {/* Large glowing follower */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9998]"
        style={{
          border: '1px solid rgba(124, 58, 237, 0.5)',
          backgroundColor: isHovering ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
          boxShadow: isHovering ? '0 0 20px rgba(124, 58, 237, 0.4)' : 'none',
        }}
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  )
}
