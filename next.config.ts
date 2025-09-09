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
};

export default nextConfig;
