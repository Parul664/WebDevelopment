// builtin fs module

// you can use the built in file system module in Node.js 
// to manage files and follders:
const fs = require('fs');
const mars = 'mars.txt';
const venus = 'venus.txt';
const jupyter = 'jupyter.txt';

// synchronous way: the following code is blocking, JS does not move to the next
// line until the current line is executed (blocking code)



// check if mars exists:
console.log(fs.existsSync(mars));

// reads mars
try{
	let data = fs.readFileSync(mars,'utf-8');
	console.log(`
	${mars} content: 
	${data}
		`);
}catch(err){
	console.log(`error ${err}`);
}


// create jupyter or override content:
fs.writeFileSync('jupyter.txt','Jupyter has the shortest day of all planets.');

// read jupyter
data = fs.readFileSync(jupyter,'utf-8');
console.log(`
${jupyter} content: 
${data}
	`);

// append content to jupyter
fs.appendFileSync(jupyter,'\nsome text')

// read jupyter
data = fs.readFileSync(jupyter,'utf-8');
console.log(`
${jupyter} new content: 
${data}
	`);

// Had there been asynchronous, then the next line would be execured even before the first one has finished executing


// the function readFileSynce has nothing to do in case that
// file given to it as a paramter does not exist and in that case
// it would return an error and hence it is our responsibility
// to catch that error using the try and catch statement