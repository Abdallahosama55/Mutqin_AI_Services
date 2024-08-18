import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  optimizeDeps: {
    include: ['@mui/material/Unstable_Grid2'],
  },
  server: {
    port: 8000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
