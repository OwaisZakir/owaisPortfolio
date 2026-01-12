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
        passes: 2,
        unsafe: true,
      },
      output: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules/three')) return 'three';
          if (id.includes('node_modules/@react-three')) return 'react-three-fiber';
          if (id.includes('node_modules/framer-motion')) return 'framer-motion';
          if (id.includes('node_modules/react-router-dom')) return 'react-router';
          if (id.includes('node_modules/@radix-ui')) return 'ui-components';
          if (id.includes('node_modules/@tanstack/react-query')) return 'react-query';
          if (id.includes('node_modules/lucide-react')) return 'lucide-icons';

          // Feature-specific chunks
          if (id.includes('Canvas3DBackground') || id.includes('Interactive3DShowcase')) return '3d-features';
          if (id.includes('AboutSection') || id.includes('SkillsSection') || id.includes('Projects3D')) return 'content-sections';
          if (id.includes('Contact3D') || id.includes('ExperienceSection')) return 'engagement-sections';

          return undefined;
        },
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|gif|svg|webp|ico/i.test(ext)) {
            return `images/[name]-[hash][extname]`;
          } else if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `fonts/[name]-[hash][extname]`;
          } else if (ext === 'css') {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    // Increase chunk size threshold to avoid unnecessary chunks
    chunkSizeWarningLimit: 1200,
    sourcemap: mode === "production" ? false : true,
    // Improve cache busting and performance
    cssCodeSplit: true,
    reportCompressedSize: true,
    // Optimize asset inline sizes
    assetsInlineLimit: 8192,
    emptyOutDir: true,
    // Enable incremental build
    watch: mode === "development" ? {} : null,
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
