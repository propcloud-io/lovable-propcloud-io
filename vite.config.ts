import { defineConfig, loadEnv } from 'vite';
import path from 'path';

// Dynamically import React plugin
let reactPlugin;
try {
  // @ts-ignore
  reactPlugin = require('@vitejs/plugin-react');
} catch (e) {
  console.log('React plugin not found, continuing without it');
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: reactPlugin ? [reactPlugin()] : [],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '::',
      port: 8080,
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  };
});
