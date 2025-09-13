import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      // Proxy all /api/* requests to the backend
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        // Optional: Rewrite path to remove /api prefix if needed
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()],
});