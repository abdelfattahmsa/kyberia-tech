import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Three.js ecosystem packages ship as ESM which Vercel's Node.js runtime
  // can't resolve without explicit transpilation. This fixes the 500 on production.
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
  ],
}

export default nextConfig
