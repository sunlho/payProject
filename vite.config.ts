import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { resolve } from "path"

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    base: env.VITE_BASE_PATH,
    plugins: [vue(), vueJsx()],
    server: {
      host: "0.0.0.0",
    },
    resolve: {
      alias: [
        { find: "@", replacement: resolve(__dirname, "src/") },
        { find: "/#", replacement: resolve(__dirname, "types/") },
      ],
    },
  }
})
