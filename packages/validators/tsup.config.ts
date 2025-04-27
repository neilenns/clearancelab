import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // or whatever your main file is
  format: ["esm"], // only output ESM
  dts: true, // generate .d.ts types
  sourcemap: true, // optional, but usually helpful
  clean: true, // clean output folder before build
  outDir: "dist", // output folder
  external: [], // external dependencies (fill if needed)
});
