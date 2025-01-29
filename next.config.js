/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  trailingSlash: false,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
