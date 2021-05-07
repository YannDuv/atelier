import { defineConfig, UserConfig } from "vite";

const config: UserConfig = {
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
    },
    rollupOptions: {
      external: /^lit-element/,
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig(config);
