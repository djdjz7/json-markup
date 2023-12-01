import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import importToCDN from "vite-plugin-cdn-import";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    importToCDN({
      modules: [
        {
          name: "monaco-editor",
          var: "monaco",
          path: "https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs/editor/editor.main.min.js",
        },
      ],
    }),
  ],

  build: {
    rollupOptions: {
      external: ["monaco-editor"],
    },
  },
});
