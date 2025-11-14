import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { copyFileSync, existsSync, cpSync } from "fs";

// Plugin to copy assets and functions to dist
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
    try {
      if (existsSync("netlify/functions")) {
        cpSync("netlify/functions", "dist/.netlify/functions", { recursive: true });
        console.log("✅ Netlify Functions copied to dist");
      } else {
        console.log("⚠️  netlify/functions folder not found");
      }
    } catch (err) {
      console.error("❌ Failed to copy Netlify Functions:", err);
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
