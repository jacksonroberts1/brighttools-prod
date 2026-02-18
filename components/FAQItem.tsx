'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { animations, transitions } from '@/lib/design-tokens'

interface FAQItemProps {
  question: string
  answer: string
  delay?: number
}

export default function FAQItem({ question, answer, delay = 0 }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="glass glass-hover rounded-xl overflow-hidden"
      variants={animations.fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ ...transitions.smooth, delay }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex justify-between items-center group"
      >
        <span className="text-lg font-semibold text-white group-hover:text-glow-hover transition-all">
          {question}
        </span>
        <motion.span
          className="text-2xl text-gray-400"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={transitions.spring}
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={transitions.smooth}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 text-gray-400">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  )
}
