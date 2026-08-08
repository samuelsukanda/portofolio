import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return
          if (id.includes('/react-dom/') || id.includes('/react/')) return 'vendor-react'
          if (id.includes('/motion/')) return 'vendor-motion'
          if (id.includes('/gsap/')) return 'vendor-gsap'
        },
      },
    },
  },
})
