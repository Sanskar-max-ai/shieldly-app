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
  // Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Forwarded-Proto',
            value: 'https',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' blob: data: https://**; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co https://api.ssllabs.com https://crt.sh https://generativelanguage.googleapis.com; frame-ancestors 'self';",
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
