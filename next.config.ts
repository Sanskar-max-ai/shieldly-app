import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow images from external domains
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  // API timeout settings
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

export default nextConfig
