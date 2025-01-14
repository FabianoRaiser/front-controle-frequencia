import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://192.168.3.3:3000', // Substitua pelo IP real do seu servidor
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
}})
