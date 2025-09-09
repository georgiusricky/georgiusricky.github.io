import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  compress: true,
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.output.filename = 'static/js/[name].[contenthash].js';
      config.output.chunkFilename = 'static/js/[name].[contenthash].chunk.js';
      
      if (config.optimization && config.optimization.splitChunks) {
        config.optimization.splitChunks.cacheGroups = {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
        };
      }
    }
    return config;
  },
};

export default nextConfig;
