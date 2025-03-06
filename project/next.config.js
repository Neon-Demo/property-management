/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure additional Next.js options as needed
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;