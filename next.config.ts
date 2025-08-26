/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,

  experimental: {},
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'dcc.progressnepal.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'dcc.progressnepal.com',
        port: '',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
