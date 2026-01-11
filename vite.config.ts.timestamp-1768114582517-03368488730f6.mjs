// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///home/project/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    middlewareMode: false
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    target: "ES2020",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production"
      }
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
            "@radix-ui/react-toast"
          ],
          // Feature-specific chunks
          "3d-features": [
            "./src/components/Canvas3DBackground",
            "./src/components/Interactive3DShowcase",
            "./src/components/Hero3DAdvanced"
          ],
          "sections": [
            "./src/components/AboutSection",
            "./src/components/SkillsSection",
            "./src/components/Projects3D",
            "./src/components/ExperienceSection",
            "./src/components/ContactSection"
          ]
        }
      }
    },
    // Increase chunk size threshold to avoid unnecessary chunks
    chunkSizeWarningLimit: 1e3,
    sourcemap: mode === "production" ? false : true,
    // Improve cache busting
    cssCodeSplit: true,
    reportCompressedSize: true
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
      "react-hook-form"
    ],
    exclude: ["@vite/preload-helper"]
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiOjpcIixcbiAgICBwb3J0OiA4MDgwLFxuICAgIG1pZGRsZXdhcmVNb2RlOiBmYWxzZSxcbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCksIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiAmJiBjb21wb25lbnRUYWdnZXIoKV0uZmlsdGVyKEJvb2xlYW4pLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiBcIkVTMjAyMFwiLFxuICAgIG1pbmlmeTogXCJ0ZXJzZXJcIixcbiAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICBjb21wcmVzczoge1xuICAgICAgICBkcm9wX2NvbnNvbGU6IG1vZGUgPT09IFwicHJvZHVjdGlvblwiLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICAvLyBWZW5kb3IgY2h1bmtzXG4gICAgICAgICAgXCJ0aHJlZVwiOiBbXCJ0aHJlZVwiXSxcbiAgICAgICAgICBcInJlYWN0LXRocmVlLWZpYmVyXCI6IFtcIkByZWFjdC10aHJlZS9maWJlclwiLCBcIkByZWFjdC10aHJlZS9kcmVpXCJdLFxuICAgICAgICAgIFwiZnJhbWVyLW1vdGlvblwiOiBbXCJmcmFtZXItbW90aW9uXCJdLFxuICAgICAgICAgIFwicmVhY3Qtcm91dGVyXCI6IFtcInJlYWN0LXJvdXRlci1kb21cIl0sXG4gICAgICAgICAgXCJ1aS1jb21wb25lbnRzXCI6IFtcbiAgICAgICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LWFjY29yZGlvblwiLFxuICAgICAgICAgICAgXCJAcmFkaXgtdWkvcmVhY3QtYWxlcnQtZGlhbG9nXCIsXG4gICAgICAgICAgICBcIkByYWRpeC11aS9yZWFjdC1hdmF0YXJcIixcbiAgICAgICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LWNoZWNrYm94XCIsXG4gICAgICAgICAgICBcIkByYWRpeC11aS9yZWFjdC1kaWFsb2dcIixcbiAgICAgICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LWRyb3Bkb3duLW1lbnVcIixcbiAgICAgICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LWxhYmVsXCIsXG4gICAgICAgICAgICBcIkByYWRpeC11aS9yZWFjdC1wb3BvdmVyXCIsXG4gICAgICAgICAgICBcIkByYWRpeC11aS9yZWFjdC1zZWxlY3RcIixcbiAgICAgICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LXRhYnNcIixcbiAgICAgICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LXRvYXN0XCIsXG4gICAgICAgICAgXSxcbiAgICAgICAgICAvLyBGZWF0dXJlLXNwZWNpZmljIGNodW5rc1xuICAgICAgICAgIFwiM2QtZmVhdHVyZXNcIjogW1xuICAgICAgICAgICAgXCIuL3NyYy9jb21wb25lbnRzL0NhbnZhczNEQmFja2dyb3VuZFwiLFxuICAgICAgICAgICAgXCIuL3NyYy9jb21wb25lbnRzL0ludGVyYWN0aXZlM0RTaG93Y2FzZVwiLFxuICAgICAgICAgICAgXCIuL3NyYy9jb21wb25lbnRzL0hlcm8zREFkdmFuY2VkXCIsXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcInNlY3Rpb25zXCI6IFtcbiAgICAgICAgICAgIFwiLi9zcmMvY29tcG9uZW50cy9BYm91dFNlY3Rpb25cIixcbiAgICAgICAgICAgIFwiLi9zcmMvY29tcG9uZW50cy9Ta2lsbHNTZWN0aW9uXCIsXG4gICAgICAgICAgICBcIi4vc3JjL2NvbXBvbmVudHMvUHJvamVjdHMzRFwiLFxuICAgICAgICAgICAgXCIuL3NyYy9jb21wb25lbnRzL0V4cGVyaWVuY2VTZWN0aW9uXCIsXG4gICAgICAgICAgICBcIi4vc3JjL2NvbXBvbmVudHMvQ29udGFjdFNlY3Rpb25cIixcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIC8vIEluY3JlYXNlIGNodW5rIHNpemUgdGhyZXNob2xkIHRvIGF2b2lkIHVubmVjZXNzYXJ5IGNodW5rc1xuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcbiAgICBzb3VyY2VtYXA6IG1vZGUgPT09IFwicHJvZHVjdGlvblwiID8gZmFsc2UgOiB0cnVlLFxuICAgIC8vIEltcHJvdmUgY2FjaGUgYnVzdGluZ1xuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcbiAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogdHJ1ZSxcbiAgfSxcbiAgLy8gT3B0aW1pemUgZGVwZW5kZW5jaWVzXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFtcbiAgICAgIFwicmVhY3RcIixcbiAgICAgIFwicmVhY3QtZG9tXCIsXG4gICAgICBcInJlYWN0LXJvdXRlci1kb21cIixcbiAgICAgIFwiQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5XCIsXG4gICAgICBcImZyYW1lci1tb3Rpb25cIixcbiAgICAgIFwidGhyZWVcIixcbiAgICAgIFwiQHJlYWN0LXRocmVlL2ZpYmVyXCIsXG4gICAgICBcIkByZWFjdC10aHJlZS9kcmVpXCIsXG4gICAgICBcImx1Y2lkZS1yZWFjdFwiLFxuICAgICAgXCJ6b2RcIixcbiAgICAgIFwiQGhvb2tmb3JtL3Jlc29sdmVyc1wiLFxuICAgICAgXCJyZWFjdC1ob29rLWZvcm1cIixcbiAgICBdLFxuICAgIGV4Y2x1ZGU6IFtcIkB2aXRlL3ByZWxvYWQtaGVscGVyXCJdLFxuICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBSGhDLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sZ0JBQWdCO0FBQUEsRUFDbEI7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxpQkFBaUIsZ0JBQWdCLENBQUMsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUM5RSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUixjQUFjLFNBQVM7QUFBQSxNQUN6QjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQTtBQUFBLFVBRVosU0FBUyxDQUFDLE9BQU87QUFBQSxVQUNqQixxQkFBcUIsQ0FBQyxzQkFBc0IsbUJBQW1CO0FBQUEsVUFDL0QsaUJBQWlCLENBQUMsZUFBZTtBQUFBLFVBQ2pDLGdCQUFnQixDQUFDLGtCQUFrQjtBQUFBLFVBQ25DLGlCQUFpQjtBQUFBLFlBQ2Y7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBO0FBQUEsVUFFQSxlQUFlO0FBQUEsWUFDYjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFVBQ0EsWUFBWTtBQUFBLFlBQ1Y7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSx1QkFBdUI7QUFBQSxJQUN2QixXQUFXLFNBQVMsZUFBZSxRQUFRO0FBQUE7QUFBQSxJQUUzQyxjQUFjO0FBQUEsSUFDZCxzQkFBc0I7QUFBQSxFQUN4QjtBQUFBO0FBQUEsRUFFQSxjQUFjO0FBQUEsSUFDWixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUyxDQUFDLHNCQUFzQjtBQUFBLEVBQ2xDO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
