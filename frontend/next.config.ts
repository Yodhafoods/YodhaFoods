import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/categories/shop-by-concern',
        destination: '/shop-by-concern',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
