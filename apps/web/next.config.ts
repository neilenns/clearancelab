import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-require-imports, unicorn/prefer-module
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // From https://dopoto.github.io/blog/20250217-nextjs-serializing-big-strings
  webpack: (config: { cache: { type: string } }) => {
    config.cache = {
      type: "memory",
    };

    return config;
  },
};

export default withBundleAnalyzer(nextConfig);

// This enables local dev access to Cloudflare bindings. It comes from
// https://opennext.js.org/cloudflare/get-started#11-develop-locally
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

void initOpenNextCloudflareForDev({
  environment: "dev",
});
