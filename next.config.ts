import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // or "http" if needed
        hostname: "**", // allow any host
      },
    ],
  },
};

export default nextConfig;
