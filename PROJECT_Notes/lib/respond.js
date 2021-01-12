// require node modules
const url = require('url');
const path = require('path');
const fs = require('fs');

//file imports
const buildBreadcrumb = require('./breadcrumb.js');
const buildMainContent = require('./mainContent.js');
const getMimeType = require('./getMimeType.js');

// static base bath: location of your static folder
// __dirname is a global variable and then go up one directory and then to it join static folder
const staticBasePath = path.join(__dirname, '..', 'static'); 


// respond to a request

//Following is a function passes to createSErver used to creater the server

const respond = (request, response) => {

	// before working with pathname, you need to decode it
	// url.parse returns an object with a property pathname
	// parsing like separating pathname and queries etc, it returns a url object which is easy to work with
	let pathname = url.parse(request.url,true).pathname;

	if(pathname === '/favicon.ico'){
		return false;
	}

	// get the corresponding full static path located in the static folder
	// pathname may may have things like %20 and so ont so for this we need to parse this
	pathname = decodeURIComponent(pathname);

	// can we find something in fullStaticPath?
	//full static path of folder static + pathname
	const fullStaticPath = (path.join(staticBasePath,pathname));
		
	// no: send 404: File Not Found
	if(!fs.existsSync(fullStaticPath)){
		console.log(`${fullStaticPath} does not exist`);
		response.write('404: file not found!');
		response.end();
		return false;
	}
	// Yes but is it a file or a directory
	let stats;
	try{
		stats = fs.lstatSync(fullStaticPath);
	}catch(err){
		console.log(`${lstatSync} Error: ${err}`);
		return false; //not in sir's
	}

	//Is it a directory
	if(stats.isDirectory()){

		// get the content from the template index.html
		let data = fs.readFileSync(path.join(staticBasePath,'project_files/index.html'),'utf-8');
		
		// build the page title
		let pathElements = pathname.split('/').reverse();
		pathElements.filter(element => element!=='');
		const folderName = pathElements[0];
		
		console.log(fullStaticPath);

		// build the breadcrumb
		const breadcrumb = buildBreadcrumb(pathname);
 		

		// build the table rows(main content)
		const mainContent = buildMainContent(fullStaticPath,pathname);

		// fill template data with page title, breadcrumb and table rows(main_content_\)
		data = data.replace('page_title',folderName);
		data = data.replace('pathname',breadcrumb);
		data = data.replace('mainContent',mainContent);

		// print the data to weboage
		response.statusCode = 200;
		response.write(data);
		return response.end();
		
	}	



	//Is it not a directory but a file wither 
		//send 401: Access Denied
	if(!stats.isFile()){
		response.statusCode = 401;
		response.write('401: Access denied!');
		console.log('neither a directory, nor a file!');
		return response.end();
	}

	// Is it a file

	// Lets get the file extension
	let fileDetails = {};
	fileDetails.extname = path.extname(fullStaticPath);


	// file size 
	let stat;
	try{
		stat = fs.statSync(fullStaticPath);
	}catch(err){
		console.log(`err: ${err}`);
	};

	fileDetails.size = stat.size;

	// get the file mime type and add it to tresponse header
	getMimeType(fileDetails.extname)
	.then(mime =>{
		
		//store headers here
		let head = {};
		let options = {};

		//response status code
		let statusCode = 200;

		// //set "Content Type Header" for all file type
		head['Content-Type'] = mime;


		// get the file size and add it to the response header
		// pdf file? -> display in browser - right now it is being displayed inline but we can ensure this by adding somthing to the header
		if(fileDetails.extname === '.pdf'){
			head['Content-Disposition'] = 'inline';  // downladable = 'attachment;filename=file.pdf'
		}
		//audio , stream in ranges // right now if we want to move to thoda agge in video that is not becoming possible because the file is being loaded in chunks, we want to change that
		if(RegExp('audio').test(mime) || RegExp('video').test(mime)){
			// AcceptRanges will help us to resume an interrupted download and also to move somewhere in the video
			head['AcceptRanges'] = 'bytes';
			const range = request.headers.range;
			if(range){

				//bytes=5210112-end;
				const start_end = range.replace(/bytes=/,'').split('-');
				const start = start_end[0];
				const end = start_end[1]? parseInt(start_end[1]) : fileDetails.size - 1;
				
				options = {start,end};

				// Content-Range

				headers['Content-Range'] = `bytes ${start}-${end}/${fileDetails.size}`;
				// Content-Length
				headers['Content-Length'] = end-start+1;
				statusCode = 206;  // streaming in ranges

			}
			
		}

		// // reading the file using fs.readFile
		// // If we dont use promises here then there will be problem in displaying the images on the browser
		// fs.promises.readFile(fullStaticPath,'utf-8',)
		// .then(data=>{
			
		// 	response.writeHead(statusCode,head);
		// 	response.write(data);
		// 	response.end();
			
		// }).catch(error => {
		// 	console.log("404 :  File Readin Error");
		// 	response.statusCode = 404;
		// 	response.write('404 :  File Reading Error');
		// 	return response.end();
		// });

		// streaming method
		const fileStream = fs.createReadStream(fullStaticPath,options);

		// Stream Chunks to your response object
		response.writeHead(statusCode,head);
		fileStream.pipe(response);

		//events: close and error
		fileStream.on('close', () => {
            return response.end();
        });
        fileStream.on('error', error => {
            console.log(error.code);
            response.statusCode = 404;
            response.write('404: FileStream error!');
            return response.end();
        });

	})
	.catch(err => {
		response.statusCode = 500;
		response.write('500: Internal Server Errorrr!');
		console.log(`Promise Error: ${err}`);
		return response.end();
	})
	// audio/video file -> stream in ranges
	// all other files stream in a normal way



}

module.exports = respond;