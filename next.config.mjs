/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com', // Unsplash's premium images
        pathname: '/**',
      },
      // Remove unsplash.com if you don't need to display images from the website
    ],
  },
};

export default nextConfig;