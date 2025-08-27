import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // From https://dopoto.github.io/blog/20250217-nextjs-serializing-big-strings
  webpack: (config: { cache: { type: string } }) => {
    config.cache = {
      type: "memory",
    };

    return config;
  },
};

export default nextConfig;

// This enables local dev access to Cloudflare bindings. It comes from
// https://opennext.js.org/cloudflare/get-started#11-develop-locally
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

void initOpenNextCloudflareForDev();
