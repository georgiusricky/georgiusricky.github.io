import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Enable compression for better performance
  compress: true,
  // Generate static files with proper cache headers
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  // Webpack optimization for better caching
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Add content hash to filenames for better caching
      config.output.filename = 'static/js/[name].[contenthash].js';
      config.output.chunkFilename = 'static/js/[name].[contenthash].chunk.js';
      
      // Optimize CSS extraction
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
