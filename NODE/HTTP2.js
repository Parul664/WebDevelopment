// a fun database

const cars = [
	{
		make : 'Audi',
		model : 'A3',
		year: '2015',
		price :'10000',
		transmission : 'Automatic',
		url: 'https://cdn.pixabay.com/photo/2016/12/07/21/50/audi-1890494_960_720.jpg'
	},
	{
		make : 'Mercedes',
		model : 'B Class',
		year: '2010',
		price :'20000',
		transmission : 'Manual',
		url : 'https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_960_720.jpg'
	},
	{
		make : 'Ford',
		model : 'Focus',
		year: '2018',
		price :'13000',
		transmission : 'Manual',
		url :'https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_960_720.jpg'
	}
]


const http = require('http');
const url = require('url');
const port = 3000;
const hostname = '127.0.0.1';

const respond = (request , response) => {

	console.log(request.url);

	// url.parse returns a url object	
	// path gives full name with queries while pathname is just queries

	const query = url.parse(request.url, true).query;
	console.log(query);
	const pathname = url.parse(request.url, true).pathname;
	console.log(pathname);

	response.setHeader('Content-Type','text/plain');

	response.writeHead(200,{'Content-Type':'text/html'});
	response.write(`<!DOCTYPE html>
		<html>
		<head>
			<meta charset = "utf=8">
			<title>Learning Node</title>
		</head>
		<body>`);
		response.write(`Hola! this has been sent through my server!`);

		const check = car => (query.make === undefined || query.make.toLowerCase()=== car.make.toLowerCase()) && 
							(query.model === undefined || query.model.toLowerCase()=== car.model.toLowerCase()) &&
							(query.year === undefined || query.year=== car.year) &&
							(query.transmission === undefined || query.transmission.toLowerCase()=== car.transmission.toLowerCase()) &&
							(query.minprice === undefined || parseInt(query.minprice) <= car.price) &&
							(query.maxprice === undefined || parseInt(query.maxprice) >= car.price);



		if(pathname === '/cars'){
			cars.filter(check).forEach(car => {
				response.write(`
					<hr>
					<img src ='${car.url}' width:'400' alt='car'>
					<p> Make: ${car.make}</p>
					<p> Model: ${car.model}</p>
					<p> Year: ${car.year}</p>
					<p> Price: ${car.price}</p>
					<p> Transmission: ${car.transmission}</p>

				`)
			} );
			//make model year, transmission, minprice and maxprice
		}

		response.end(`</body></html>`);



};

const server = http.createServer(respond);

server.listen(port, hostname, () => {console.log(`listening on port: ${port}, hostname: ${hostname}`)});



