/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  },
  async headers() {
    return [
      {
        // Applies to every route, including the marketing site, admin, and portal.
        source: '/:path*',
        headers: [
          // Force HTTPS on repeat visits. `preload` requires submission to
          // hstspreload.org to take full effect — safe to leave in either way.
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Prevents this site from being embedded in an <iframe> elsewhere,
          // which blocks clickjacking attacks against the admin/portal login.
          { key: 'X-Frame-Options', value: 'DENY' },
          // Stops the browser from guessing content types away from what's declared.
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Next.js needs 'unsafe-inline' for its hydration/RSC bootstrap
              // scripts; 'unsafe-eval' is dev-only (fast refresh) and should
              // be dropped once you've confirmed prod doesn't need it.
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://images.unsplash.com",
              "font-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; ')
          }
        ]
      }
    ];
  }
};

export default nextConfig;
