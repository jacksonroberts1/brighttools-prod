'use client'

import { motion } from 'framer-motion'

export default function ProcessingBridge() {
  const steps = [
    { label: 'Role', x: 0 },
    { label: 'Format', x: 1 },
    { label: 'Context', x: 2 },
    { label: 'Logic', x: 3 },
  ]

  return (
    <div className="relative w-full md:w-auto flex items-center justify-center px-4 md:px-12 py-8 md:py-12">
      
      {/* Grid layout with connecting path */}
      <div className="relative w-full md:w-auto">
        
        {/* Connecting line path */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 400 80"
          preserveAspectRatio="none"
          style={{ display: 'none' }}
        >
          <motion.path
            d="M 20 40 Q 100 10 180 40 T 340 40"
            stroke="rgba(34, 211, 238, 0.2)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.5, duration: 1.2 }}
          />
        </svg>

        {/* Steps - vertical layout */}
        <div className="flex flex-col gap-4 md:gap-5 w-full md:w-48">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.12, duration: 0.4 }}
              className="flex flex-col items-center gap-3"
            >
              {/* Card background */}
              <motion.div
                className="w-12 h-12 rounded-lg border border-cyan-400/20 bg-gradient-to-br from-cyan-400/5 to-blue-400/5 flex items-center justify-center relative overflow-hidden group cursor-default"
                whileHover={{ borderColor: 'rgba(34, 211, 238, 0.4)' }}
              >
                {/* Animated inner border */}
                <motion.div
                  className="absolute inset-0 rounded-lg border border-cyan-400/0 group-hover:border-cyan-400/20"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                />
                
                {/* Letter badge */}
                <motion.div
                  className="text-2xl font-bold text-cyan-300/60 group-hover:text-cyan-300/80"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {step.label.charAt(0).toUpperCase()}
                </motion.div>
              </motion.div>

              {/* Label */}
              <span className="text-xs font-semibold text-white/70 tracking-wide text-center">
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  )
}
