import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 👇 USE basepath for github pages
  basePath: '/georgiusricky.github.io', // or just '/'
};
export default nextConfig;