import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"], // or 'src/index.ts' if that's the main entry
  outDir: "dist",
  format: ["esm"],
  external: ["three"],
  bundle: true, // To preserve folder structure
  sourcemap: true,
  minify: true, // ✅ ensures JavaScript is minified
  splitting: true,
  treeshake: true,
  clean: true,
  outExtension: () => ({ js: ".js" }),
});
