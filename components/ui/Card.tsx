'use client'

import { ReactNode, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  delay?: number
  hoverable?: boolean
}

export default function Card({
  children,
  className = '',
  delay = 0,
  hoverable = true
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, rotate: 0.5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`glass rounded-3xl p-8 md:p-10 card-shadow border border-white/15 relative overflow-hidden group ${className}`}
    >
      {/* Spotlight effect following mouse */}
      {isHovered && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 200,
            height: 200,
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15), transparent 70%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
