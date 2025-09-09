import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  // For custom domain with GitHub Pages
  trailingSlash: true,
  // Optional: uncomment if you still have path issues
  // basePath: process.env.NODE_ENV === 'production' ? '' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
};

export default nextConfig;