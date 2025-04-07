import http from 'http';

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
  timeout: 5000
};

console.log('Checking if server is running at http://localhost:3000...');

const req = http.request(options, (res) => {
  console.log(`Server is running! Status code: ${res.statusCode}`);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response received successfully');
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.error('Server is not running or not accessible:', error.message);
  process.exit(1);
});

req.on('timeout', () => {
  console.error('Request timed out. Server might be starting or not responding.');
  req.destroy();
  process.exit(1);
});

req.end();
