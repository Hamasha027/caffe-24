import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  // Allow cross-origin requests during local dev (e.g., from mobile on same network)
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.1.63"],
};

export default nextConfig;
