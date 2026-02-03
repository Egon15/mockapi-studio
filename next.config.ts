import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["localhost:5173", "127.0.0.1:5173", "*.local-origin.dev"],
};

export default nextConfig;
