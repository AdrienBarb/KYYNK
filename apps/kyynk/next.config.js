const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

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
    loader: 'custom',
    loaderFile: './node_modules/@uploadcare/nextjs-loader/build/loader.js',
  },
};

module.exports = withNextIntl(nextConfig);
