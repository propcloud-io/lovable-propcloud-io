const { spawn } = require('child_process');
const path = require('path');

console.log('Starting development server...');

// Run npm run dev
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const dev = spawn(npm, ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

dev.on('error', (error) => {
  console.error('Failed to start development server:', error);
});

dev.on('close', (code) => {
  console.log(`Development server exited with code ${code}`);
});
