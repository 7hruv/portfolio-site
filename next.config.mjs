/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  // Serve images as AVIF (smallest) then WebP fallback
  images: {
    formats: ['image/avif', 'image/webp'],
    // 1 year cache for optimised images
    minimumCacheTTL: 31536000,
    // Breakpoints matching the srcsets used in the site
    deviceSizes: [390, 640, 768, 1080, 1200],
    imageSizes: [288, 384],
  },

  // Enable gzip/brotli compression for HTML/CSS/JS responses
  compress: true,

  // Remove X-Powered-By: Next.js header (minor security + byte savings)
  poweredByHeader: false,

  // Long-lived cache headers for static assets
  async headers() {
    return [
      {
        source: '/(.*)\\.(webp|avif|png|jpg|jpeg|svg|ico|woff2|woff)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
