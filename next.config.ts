import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  // For GitHub Pages with custom domain
  basePath: process.env.GITHUB_PAGES ? '/georgiusricky.github.io' : '',
  assetPrefix: process.env.GITHUB_PAGES ? '/georgiusricky.github.io/' : '',
  trailingSlash: true,
};

export default nextConfig;