import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { copyFileSync } from "fs";

// Plugin to copy service worker and _redirects to dist
const copyAssets = () => ({
  name: "copy-assets",
  writeBundle() {
    try {
      copyFileSync("public/sw.js", "dist/sw.js");
      console.log("✅ Service worker copied to dist");
    } catch (err) {
      console.error("❌ Failed to copy service worker:", err);
    }
    try {
      copyFileSync("public/_redirects", "dist/_redirects");
      console.log("✅ _redirects file copied to dist");
    } catch (err) {
      console.error("❌ Failed to copy _redirects:", err);
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    copyAssets()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}));
