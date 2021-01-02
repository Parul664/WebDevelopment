// the HTTP protocol iis used to transfer protocol from the server
// to the webpage, for this we have a built in HTTP module inside node

const http = require('http');

// connection settings
// port is an end point of communication
const port = 3000;

//hostname is the IP associated with the device in question connected to the conputer network
const hostname = '127.0.0.1';

// callback function
const respond = (request , response) => {
	// request is recevied by the user when the user makes a request
	// containes url etc.
	// response comes with features that help send the response to the server.

	console.log(request.url);

	// Response Headers
	//response.setHeader(header name, value)
	response.setHeader('Content-Type','text/plain');

	//writeHead(status code, {headers inside object})
	//404: page not found 200 : success
	response.writeHead(200,{'Content-Type':'text/html'});
	//writeHead is given presidence

	//response.write sends the body of the response
	response.write(`<!DOCTYPE html>
		<html>
		<head>
			<meta charset = "utf=8">
			<title>Learning Node</title>
		</head>
		<body>`);
		response.write(`
			Hola! this has been sent through my server!`);
		response.end(`
		</body>
		</html>
		`);


};

// we want to create a server using this http module
// parametr - a callback function , executed when a user makes a request
// to ur server
const server = http.createServer(respond);

// listen to the user reqest
server.listen(port, hostname, () => {console.log(`listening on port: ${port}, hostname: ${hostname}`)});



// You'll notice that by default a url named favicon.ico is printed
// this is the default path that is searched, so you can avoid printing it using
// an if statement.