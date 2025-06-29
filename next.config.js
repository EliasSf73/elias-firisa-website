/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/elias_firisa_webiste',
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/elias_firisa_webiste/:path*',
      },
    ];
  },
};

module.exports = nextConfig
