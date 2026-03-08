import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com", pathname: "/**", protocol: "https" }],
  },
};

export default nextConfig;
