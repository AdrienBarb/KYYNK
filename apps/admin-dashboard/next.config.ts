import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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

export default nextConfig;
