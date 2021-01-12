// We'll make this through ull node. Can be made using 
// NPM, which is easier.

// require node modules
const http = require('http');

// file imports 
const respond = require('./lib/respond.js');

// connection settings
const port = process.env.port || 3000;
// right now we are setting it to 3000 but later when we deploy our app
// we'll use the process.env.port || 3000 if you dont find any

// create server
const server = http.createServer(respond);

// listent o the client requests on the specidic port, 
// the port should be available

server.listen(port , () => {
	console.log(`Listening on port: ${port}`);
});