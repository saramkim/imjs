import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@core': '/src/core',
      '@store': '/src/store',
      '@ui': '/src/ui',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
    },
  },
});
