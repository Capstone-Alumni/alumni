/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  experimental: {
    // Required:
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
  eslint: {
    dirs: ['app', 'lib', 'modules', 'pages', 'types'],
  },
};

module.exports = nextConfig;
