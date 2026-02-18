'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface FloatingElementProps {
  children: React.ReactNode
  delay?: number
}

export default function FloatingElement({ children, delay = 0 }: FloatingElementProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: isHovered ? -10 : [0, -5, 0],
        rotate: isHovered ? [0, 5, -5, 0] : 0,
      }}
      transition={{
        y: {
          duration: isHovered ? 0.3 : 3,
          repeat: isHovered ? 0 : Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: delay,
        },
        rotate: {
          duration: 0.5,
          repeat: isHovered ? Infinity : 0,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="inline-block cursor-pointer"
    >
      {children}
    </motion.div>
  )
}
