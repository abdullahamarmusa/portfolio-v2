import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    // Split vendor code into cacheable chunks so the initial page load parses
    // far less JS and leverages HTTP caching across deployments.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("motion") || id.includes("react")) return "react";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("@supabase") || id.includes("supabase")) return "supabase";
          return "vendor";
        },
      },
    },
  },
});
