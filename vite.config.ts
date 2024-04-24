import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";


export default defineConfig(async () => ({
  plugins: [svelte()],
  clearScreen: false,
  resolve: {
    alias: {
      "@": path.resolve("./src/"),
    },
  },
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
}));
