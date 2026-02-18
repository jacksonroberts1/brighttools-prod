'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

interface Floating3DIconProps {
  icon: 'cube' | 'sphere' | 'torus' | 'octahedron'
}

function Icon3D({ icon }: Floating3DIconProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2
    }
  })

  const geometry = {
    cube: <boxGeometry args={[1, 1, 1]} />,
    sphere: <sphereGeometry args={[0.6, 32, 32]} />,
    torus: <torusGeometry args={[0.5, 0.2, 16, 32]} />,
    octahedron: <octahedronGeometry args={[0.7]} />
  }[icon]

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        {geometry}
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  )
}

export default function Floating3DIcon({ icon }: Floating3DIconProps) {
  return (
    <div className="w-full h-32">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <Icon3D icon={icon} />
        </Suspense>
      </Canvas>
    </div>
  )
}
