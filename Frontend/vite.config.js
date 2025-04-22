import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/U-Well/',
  build: {
    target: 'esnext',  // This ensures modern JavaScript is used
  },
});
