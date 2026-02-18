'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="pointer-events-none fixed z-50 mix-blend-screen"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-96 h-96 bg-gradient-radial from-indigo-500/30 via-cyan-500/20 to-transparent blur-3xl" />
      </motion.div>

      {/* Secondary glow */}
      <motion.div
        className="pointer-events-none fixed z-50 mix-blend-screen"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          opacity: isVisible ? 0.4 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-64 h-64 bg-gradient-radial from-pink-500/30 via-transparent to-transparent blur-2xl" />
      </motion.div>
    </>
  )
}
