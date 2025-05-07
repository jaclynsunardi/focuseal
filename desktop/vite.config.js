import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'src/renderer'),  // Points to React files
  base: './',  // Required for Electron file paths
  build: {
    outDir: '../../dist',  // Output to root/dist
    emptyOutDir: true,
  },
  server: {
    port: 5173,  // Vite dev server port
  },
});