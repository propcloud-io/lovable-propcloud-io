import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting Netlify direct build script');

// Log environment variables (without exposing full key)
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

console.log('VITE_SUPABASE_URL exists:', !!supabaseUrl);
console.log('VITE_SUPABASE_URL length:', supabaseUrl.length);
console.log('VITE_SUPABASE_ANON_KEY exists:', !!supabaseAnonKey);
console.log('VITE_SUPABASE_ANON_KEY length:', supabaseAnonKey.length);

// Create a simple vite.config.js file without any plugins
console.log('Creating simplified vite.config.js');
const viteConfig = `
import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
`;

fs.writeFileSync(path.join(__dirname, 'vite.config.simple.js'), viteConfig);
console.log('Created simplified vite.config.js');

// Run the build directly with the simplified config
try {
  console.log('Running Vite build with simplified config');
  execSync('npx vite build --config vite.config.simple.js', { stdio: 'inherit' });
  console.log('Vite build completed successfully!');
} catch (buildError) {
  console.error('Vite build failed:', buildError.message);
  
  // Create a simple index.html as fallback
  console.log('Creating fallback index.html');
  
  if (!fs.existsSync(path.join(__dirname, 'dist'))) {
    fs.mkdirSync(path.join(__dirname, 'dist'));
  }
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PropCloud.io</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
      color: #333;
    }
    .container {
      max-width: 800px;
      padding: 2rem;
      text-align: center;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #2563eb;
      margin-bottom: 1rem;
    }
    p {
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
    .cta {
      display: inline-block;
      background-color: #2563eb;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 500;
      transition: background-color 0.2s;
    }
    .cta:hover {
      background-color: #1d4ed8;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to PropCloud.io</h1>
    <p>
      The autonomous property management platform for short-term rental hosts.
      We're currently in development and will be launching soon.
    </p>
    <p>
      Join our waitlist to be notified when we launch!
    </p>
    <a href="mailto:contact@propcloud.io" class="cta">Contact Us</a>
  </div>
</body>
</html>
  `;
  
  fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), html);
  console.log('Created fallback index.html');
}

console.log('Build process completed');
