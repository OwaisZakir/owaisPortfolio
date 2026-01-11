import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    middlewareMode: false,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "ES2020",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production",
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "three": ["three"],
          "react-three-fiber": ["@react-three/fiber", "@react-three/drei"],
          "framer-motion": ["framer-motion"],
          "react-router": ["react-router-dom"],
          "ui-components": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-popover",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
          ],
          // Feature-specific chunks
          "3d-features": [
            "./src/components/Canvas3DBackground",
            "./src/components/Interactive3DShowcase",
            "./src/components/Hero3DAdvanced",
          ],
          "sections": [
            "./src/components/AboutSection",
            "./src/components/SkillsSection",
            "./src/components/Projects3D",
            "./src/components/ExperienceSection",
            "./src/components/ContactSection",
          ],
        },
      },
    },
    // Increase chunk size threshold to avoid unnecessary chunks
    chunkSizeWarningLimit: 1000,
    sourcemap: mode === "production" ? false : true,
    // Improve cache busting
    cssCodeSplit: true,
    reportCompressedSize: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@tanstack/react-query",
      "framer-motion",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "lucide-react",
      "zod",
      "@hookform/resolvers",
      "react-hook-form",
    ],
    exclude: ["@vite/preload-helper"],
  },
}));
