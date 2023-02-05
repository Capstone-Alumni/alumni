/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  experimental: {
    // Required:
    appDir: true,
    esmExternals: false,
    swcMinify: false,
  },
  compiler: {
    styledComponents: true,
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
    return [
      {
        source: '/platformHost/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
