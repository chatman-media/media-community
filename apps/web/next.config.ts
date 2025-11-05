import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@chatman/shared', '@chatman/ui'],
  eslint: {
    dirs: ['app', 'components', 'lib'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.chatman.media',
      },
    ],
  },
}

export default nextConfig
