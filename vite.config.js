import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        destinations: resolve(__dirname, 'destinations.html'),
        services: resolve(__dirname, 'services.html'),
        offices: resolve(__dirname, 'offices.html'),
        reviews: resolve(__dirname, 'reviews.html')
      }
    }
  }
});
