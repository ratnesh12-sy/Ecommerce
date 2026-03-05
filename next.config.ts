import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "electronicparadise.in",
      },
      // Adding a wildcard pattern to allow any domain since admins can add products
      // from any source url. Note: In a strict production environment you might want
      // to limit this to specific domains or your own CDN/S3 bucket.
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      }
    ],
  },
};

export default nextConfig;
