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
        target: 'https://apichatbot.iryax.com',
        changeOrigin: true,
        secure: false,
      },
      '/health': {
        target: 'https://apichatbot.iryax.com',
        changeOrigin: true,
        secure: false,
      },
      '/status': {
        target: 'https://apichatbot.iryax.com',
        changeOrigin: true,
        secure: false,
      },
      '/crawl': {
        target: 'https://apichatbot.iryax.com',
        changeOrigin: true,
        secure: false,
      },
      '/sources': {
        target: 'https://apichatbot.iryax.com',
        changeOrigin: true,
        secure: false,
      },
      '/feedback': {
        target: 'https://apichatbot.iryax.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
