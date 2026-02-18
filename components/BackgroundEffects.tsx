'use client'

export default function BackgroundEffects() {
  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Scanline effect */}
      <div className="scanline" />

      {/* Radial gradient spotlight */}
      <div
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{
          background: 'radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.03), transparent 80%)',
        }}
      />
    </>
  )
}
