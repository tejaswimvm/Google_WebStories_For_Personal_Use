/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/webstories/", // trailing slash is safer for asset loading
  resolve: {
    alias: {
      src: path.resolve("./src"),
      "@cms-components": path.resolve(__dirname, "./src/components/cms"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@theme": path.resolve(__dirname, "./src/theme"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@custom-api": path.resolve(__dirname, "./src/api"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@cms-sections": path.resolve(__dirname, "./src/sections/cms"),
      "@website": path.resolve(__dirname, "./src/components/website"),
      "@custom-components": path.resolve(
        __dirname,
        "./src/components/custom-components"
      ),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  build: {
    outDir: "dist", // Vercel will serve from dist/
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "./index.html"),
        editor: path.resolve(__dirname, "./editor.html"),
      },
    },
  },
  define: {
    SUB_ROUTE: JSON.stringify("/webstories"),
  },
});
