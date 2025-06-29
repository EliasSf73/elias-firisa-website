/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://eliasfirisa.github.io/elias_firisa_webiste/:path*',
      },
    ];
  },
};

module.exports = nextConfig
