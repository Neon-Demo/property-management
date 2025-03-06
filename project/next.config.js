/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'graph.microsoft.com'],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;