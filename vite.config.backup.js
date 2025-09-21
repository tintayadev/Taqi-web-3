import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración mínima y estable
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  server: {
    port: 5173,
    strictPort: true,
  },
})

