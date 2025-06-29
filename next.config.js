/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/elias_firisa_webiste',
  trailingSlash: true,
  assetPrefix: '/elias_firisa_webiste/',
};

module.exports = nextConfig
