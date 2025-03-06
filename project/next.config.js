/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'graph.microsoft.com'],
  },
  experimental: {
    appDir: true,
  },
  // Set output to standalone mode (optimized for deployments)
  output: 'standalone',
};

module.exports = nextConfig;