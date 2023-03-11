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
    domains: [
      'bka.hcmut.edu.vn',
      'encrypted-tbn0.gstatic.com',
      'firebasestorage.googleapis.com',
    ],
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
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async rewrites() {
    const platformHost = process.env.NEXT_PUBLIC_PLATFORM_HOST;
    return [
      {
        source: '/platformHost/:path*',
        destination: `${platformHost}/:path*`,
      },
      {
        source: '/api/fund_update_transaction',
        destination: '/api/funds/transaction_ipn',
      },
    ];
  },
};

module.exports = nextConfig;
