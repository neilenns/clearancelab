import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/plantools", "@workspace/validators"],
};

export default nextConfig;
