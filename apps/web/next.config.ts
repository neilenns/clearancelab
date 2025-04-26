/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/plantools", "@workspace/validators"],
  // For some reason next.js was throwing a warning about not being able to resolve aws4
  // in the mongodb package. That's not ever used anywhere, so disable it.
  // From: https://stackoverflow.com/questions/68610456/module-not-found-cant-resolve-aws4
  webpack: (config, _options) => {
    config.resolve.fallback = {
      aws4: false,
    };

    return config;
  },
};

export default nextConfig;
