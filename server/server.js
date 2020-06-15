// First method of creating server on port 4000
const http = require('http');
http.createServer((req, res) => { // Whenever a request is made this callback is fired, so if anything is defined globally in preceeding files are not accessible by other requests
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('HELLO');
    // console.log(req);
    process.stdout.write(`Got a new request`);
}).listen(4000);
process.stdout.write('Server is running on port 4000');

// Second method of creating server on port 5000
// const server = http.createServer();
// server.on('listening', (req, res) => { console.log('Listening on 5000'); });
// server.on('connection', (req, res) => { console.log('A new request made'); });
// server.on('request', (req, res) => { console.log('jajajaj'); });
// server.on('close', (req, res) => { console.log('Closing server'); });
// server.listen(5000);

