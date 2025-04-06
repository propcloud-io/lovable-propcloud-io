import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Testing build process locally');

try {
  // Clean the dist directory if it exists
  if (fs.existsSync(path.join(__dirname, 'dist'))) {
    console.log('Cleaning dist directory');
    fs.rmSync(path.join(__dirname, 'dist'), { recursive: true, force: true });
  }
  
  // Run the build
  console.log('Running Vite build');
  execSync('npx vite build', { stdio: 'inherit' });
  console.log('Vite build completed successfully!');
  
  // List the files in the dist directory
  console.log('Files in dist directory:');
  const files = fs.readdirSync(path.join(__dirname, 'dist'));
  files.forEach(file => {
    console.log(`- ${file}`);
  });
  
  // Start a preview server
  console.log('Starting preview server');
  execSync('npx vite preview', { stdio: 'inherit' });
} catch (error) {
  console.error('Error during build test:', error.message);
}
