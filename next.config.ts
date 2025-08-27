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
      {
        protocol: 'https',
        hostname: '**', // Wildcard pattern
      },
      {
        protocol: 'http',
        hostname: '**', // Wildcard pattern
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
