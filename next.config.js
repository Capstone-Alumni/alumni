/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  experimental: {
    // Required:
    appDir: true,
    esmExternals: false,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['bka.hcmut.edu.vn', 'encrypted-tbn0.gstatic.com'],
  },
  eslint: {
    dirs: ['src'],
    ignorePatterns: [
      'src/modules/share/components/@material-extend/*',
      'src/modules/share/components/animate/*',
      'src/modules/share/components/material-ui/*',
      'src/lib/mui/*',
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    const platformHost = process.env.NEXT_PUBLIC_PLATFORM_HOST;
    return [
      {
        source: '/platformHost/:path*',
        destination: `${platformHost}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
