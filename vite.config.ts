import { defineConfig } from "vite";
import vike from "vike/plugin";

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  plugins: [
    vike({
      prerender: true,
    }),
  ],
  resolve: {
    alias: {
      lib: "/lib",
      components: "/components",
    },
  },
});
