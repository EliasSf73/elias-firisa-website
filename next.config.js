/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/elias-firisa-website',
  trailingSlash: true,
  assetPrefix: '/elias-firisa-website/',
};

module.exports = nextConfig
