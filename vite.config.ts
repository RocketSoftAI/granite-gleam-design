import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Chunk splitting for better caching and smaller initial load
    rollupOptions: {
      output: {
        manualChunks: {
          // React core - rarely changes, cache aggressively
          'react-vendor': ['react', 'react-dom'],
          // Router - separate chunk for route-based code splitting
          'router': ['react-router-dom'],
          // UI components - shared across pages
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-accordion',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-label',
            '@radix-ui/react-slot',
          ],
          // Data fetching - used across app
          'query': ['@tanstack/react-query'],
        },
      },
    },
    // Terser for better minification (removes console.log in prod)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Increase warning limit since we're chunking intentionally
    chunkSizeWarningLimit: 600,
  },
}));
