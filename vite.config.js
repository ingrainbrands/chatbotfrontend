import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      // Proxy all /chat, /health, /status, /crawl requests to the backend
      '/chat': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/health': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/status': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/crawl': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/sources': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/feedback': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
