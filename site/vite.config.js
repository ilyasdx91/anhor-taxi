import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  server: {
    port: 5180,
    strictPort: true,
    open: true,
    host: true,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    cssMinify: true,
  },
  css: {
    devSourcemap: true,
  },
});
