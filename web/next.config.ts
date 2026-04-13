import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  async rewrites() {
    return [
      {
        source: "/assets/:path*",
        destination: "/api/assets/:path*",
      },
    ];
  },
};

export default nextConfig;
