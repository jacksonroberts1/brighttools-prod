'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import { Suspense, useRef, useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'

function Particles() {
  const count = 200
  const particlesRef = useRef<THREE.Points>(null)
  const [scrollY, setScrollY] = useState(0)

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      scales[i] = Math.random()
    }

    return { positions, scales }
  }, [count])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      // Slow rotation
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05

      // Parallax effect based on scroll
      particlesRef.current.position.y = scrollY * 0.001
    }
  })

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3))
    geo.setAttribute('scale', new THREE.BufferAttribute(particles.scales, 1))
    return geo
  }, [particles])

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function Scene3D() {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />

          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-10, -10, -5]} intensity={0.3} color="#ffffff" />
          <pointLight position={[10, -10, -5]} intensity={0.3} color="#ffffff" />

          {/* Particles */}
          <Particles />

          {/* Environment */}
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  )
}
