'use client'

import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  noPadding?: boolean
}

export default function Section({ 
  children, 
  className = '', 
  id,
  noPadding = false 
}: SectionProps) {
  // Improved vertical padding for better visual rhythm and breathing room
  const paddingClass = noPadding ? '' : 'py-24 md:py-40 px-6 md:px-12'
  
  return (
    <section
      id={id}
      className={`relative ${paddingClass} ${className}`}
    >
      {children}
    </section>
  )
}
