import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"/job-board/",
  server: {
    port: 5173,
    proxy: {
      '/api/v1': {
        target: 'https://job-board-gk5p.onrender.com',
        changeOrigin: true
      }
    }
  }
})
