import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import nightwatchPlugin from 'vite-plugin-nightwatch'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), vueDevTools(), nightwatchPlugin(), tailwindcss()],
  server: {
    host: true, // expose to network
    port: 5173, // dev server port
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
