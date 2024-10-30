const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['d10arthua11ogq.cloudfront.net'],
  },
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
};

module.exports = withNextIntl(nextConfig);
