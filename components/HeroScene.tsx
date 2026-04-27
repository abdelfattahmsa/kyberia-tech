'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Rotating 10-ray asterisk (matches /icon.svg) ─────────────── */
function Asterisk() {
  const coreRef  = useRef<THREE.Group>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (coreRef.current)  coreRef.current.rotation.z  += delta * 0.13
    if (ring1Ref.current) ring1Ref.current.rotation.y += delta * 0.17
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.09
  })

  // Single ray geometry, offset so it starts at the center
  const rayGeo = useMemo(() => {
    const g = new THREE.BoxGeometry(0.052, 0.9, 0.052)
    g.translate(0, 0.45, 0)
    return g
  }, [])

  const rayMat = useMemo(() => new THREE.MeshStandardMaterial({
    color:            '#FF2F92',
    emissive:         '#FF2F92',
    emissiveIntensity: 0.55,
    roughness:         0.15,
    metalness:         0.75,
  }), [])

  return (
    <>
      {/* Floating, slowly spinning core */}
      <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.55}>
        <group ref={coreRef}>
          {Array.from({ length: 10 }, (_, i) => (
            <mesh
              key={i}
              geometry={rayGeo}
              material={rayMat}
              rotation={[0, 0, (i / 10) * Math.PI * 2]}
            />
          ))}
          {/* Centre sphere */}
          <mesh>
            <sphereGeometry args={[0.15, 24, 24]} />
            <meshStandardMaterial
              color="#FF2F92"
              emissive="#FF2F92"
              emissiveIntensity={1.8}
              roughness={0}
              metalness={1}
            />
          </mesh>
        </group>
      </Float>

      {/* Orbit ring 1 — tilted pink torus */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2.2, 0.25, 0]}>
        <torusGeometry args={[1.3, 0.011, 8, 120]} />
        <meshStandardMaterial
          color="#FF2F92"
          transparent
          opacity={0.22}
          emissive="#FF2F92"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Orbit ring 2 — outer subtle ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 1.5, 0.7, 0.4]}>
        <torusGeometry args={[1.78, 0.005, 8, 120]} />
        <meshStandardMaterial color="#aaaaff" transparent opacity={0.07} />
      </mesh>
    </>
  )
}

/* ─── Background wireframe grid ────────────────────────────────── */
function BackgroundGrid() {
  const geo = useMemo(() => {
    const half = 5
    const step = 0.85
    const pts: number[] = []
    for (let i = -half; i <= half; i += step) {
      // horizontal
      pts.push(-half, i, -2.8,  half, i, -2.8)
      // vertical
      pts.push(i, -half, -2.8,  i,  half, -2.8)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3))
    return g
  }, [])

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.028} />
    </lineSegments>
  )
}

/* ─── Main exported scene ──────────────────────────────────────── */
export default function HeroScene() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        {/* Lighting */}
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 4, 3]} intensity={0.6} color="#ffffff" />
        <pointLight position={[0, 0, 4.5]} intensity={60} color="#FF2F92" decay={2} />
        <pointLight position={[-3, 2, 2]}  intensity={25} color="#cc00ff"  decay={2} />

        {/* Geometry */}
        <Asterisk />
        <BackgroundGrid />

        {/* Pink particle cloud around the asterisk */}
        <Sparkles
          count={360}
          scale={[7, 7, 7]}
          size={1.1}
          speed={0.38}
          color="#FF2F92"
          opacity={0.52}
        />

        {/* Dim white star-dust in the background */}
        <Sparkles
          count={260}
          scale={[13, 13, 7]}
          size={0.65}
          speed={0.1}
          color="#ffffff"
          opacity={0.16}
        />
      </Canvas>
    </div>
  )
}
