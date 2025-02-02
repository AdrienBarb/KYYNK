const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  optimizeFonts: false,
  swcMinify: true,
  crossOrigin: 'anonymous',
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.devtool = false;
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kyynk-296765883.imgix.net',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
