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
  async rewrites() {
    const platformHost = process.env.NEXT_PUBLIC_PLATFORM_HOST;
    return [
      {
        source: '/platformHost/:path*',
        destination: `${platformHost}/:path*`,
      },
      // {
      //   source: '/paymentv2/:path*',
      //   destination: 'https://sandbox.vnpayment.vn/paymentv2/:path*',
      // },
    ];
  },
  async redirects() {
    return [
      {
        source: '/vnpayUrl',
        destination: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
