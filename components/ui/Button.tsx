'use client'

import { ReactNode } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: ButtonProps) {
  // Playful base styles with micro-interactions
  const baseStyles = 'font-semibold rounded-full transition-all duration-200 cursor-pointer border-2 relative tracking-wide group overflow-hidden'
  
  const variants = {
    // Primary: Playful color shift and dramatic scale on hover
    primary: 'bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 border-transparent text-white shadow-[0_12px_30px_rgba(34,211,238,0.25)] hover:shadow-[0_20px_50px_rgba(34,211,238,0.45)] hover:scale-110 hover:rotate-1 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-600 active:scale-95',
    // Secondary: Tilt and glow effect
    secondary: 'glass border-white/20 text-white font-medium hover:border-white/60 hover:bg-white/20 hover:scale-105 hover:-rotate-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]',
    // Ghost: Bold transform on hover
    ghost: 'border-transparent text-white hover:bg-white hover:text-black hover:scale-105 font-medium',
  }
  
  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-12 py-4 text-lg',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {/* Animated background shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
      </div>
    </button>
  )
}
