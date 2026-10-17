import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The three.js scene is deliberately a separate, lazily-loaded chunk —
    // it is never on the critical path, so the default warning is noise.
    chunkSizeWarningLimit: 1000,
  },
})
