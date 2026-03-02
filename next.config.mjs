/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // allow all paths
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com', // exact hostname, no wildcard
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;