import { defineConfig, loadEnv } from 'vite';
import path from 'path';

// Try to import the React plugin, fall back to React-SWC if not available
let react;
try {
  react = require('@vitejs/plugin-react');
} catch (e) {
  try {
    console.log('Failed to load @vitejs/plugin-react, trying @vitejs/plugin-react-swc');
    react = require('@vitejs/plugin-react-swc');
  } catch (e2) {
    console.error('Failed to load React plugins:', e2);
    throw new Error('No React plugin available for Vite');
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react.default ? react.default() : react()],
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
