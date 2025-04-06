import { defineConfig } from 'vite';
import path from 'path';

// Dynamically import React plugin
let reactPlugin;
try {
  reactPlugin = require('@vitejs/plugin-react');
} catch (e) {
  console.log('React plugin not found, continuing without it');
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: reactPlugin ? [reactPlugin()] : [],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
