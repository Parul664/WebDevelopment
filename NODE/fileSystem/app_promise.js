// Use the fs module the asynchronous way through callback functions.
// JS code in this case is unblocking, meaning JS can move too the next line
// while an fs operation is waiting for callback to be executed
const fs = require('fs');
const mars = 'mars.txt';
const venus = 'venus.txt';
const jupyter = 'jupyter.txt';


//check if a file exists: method1 - can be used if you are planning to manipulate a file later on
fs.stat(mars, (err,data) => {
	if(err){
		console.log(err);
	}else{
		console.log(`${mars} exists`)
	}console.log(`${jupyter} content : ${data}`);
});

//changing permissions of the file to all
fs.chmod(mars, 0777, err=>{
	if(err){
			console.log(`Error : ${err}`);
		}
});

//check if a file exists: method2 - can be used if you are not planning to manipulate a file later on.
// trying to read a file (not recommended)
// the second parameter is the default parameter and you can use permissions using other constants like R_OK meaning readonly and so on.
fs.access(mars,fs.constants.W_OK, err => {
	if(err){
			console.log(`Error : ${err}`);
		}
});

// read/write/append:
//overridden - 
//write in jupyter
fs.promises.writeFile(jupyter,'I am learning Node')
.then(() => fs.promises.readFile(jupyter,`utf-8`))
.then(data => {console.log(`${jupyter} content : ${data}`);})
.then(() => {fs.promises.appendFile(jupyter,'\n It is so fun!');})
.then(() => fs.promises.readFile(jupyter,`utf-8`))
.then(data => {console.log(`${jupyter} content : ${data}`);})
.catch(err => {console.log(`Error : ${err}`)})

// console.log
// appendFile
// readFile
// console.log
// catch statement for all above

console.log("Hello I am a part of a file with asynchronous functions");


// I am using version 8 and so these promises won't work here
// it is for versions>= 10

// using the async await
async function f(){
	await fs.promises.writeFile(jupyter,'I am learning Node');
	let data = await fs.promises.readFile(jupyter,`utf-8`);
	console.log(`${jupyter} content : ${data}`);
	fs.promises.appendFile(jupyter,'\n It is so fun!');
	let data = await fs.promises.readFile(jupyter,`utf-8`);
	console.log(`${jupyter} content : ${data}`);	
}

f().catch(err => {console.log(`Error : ${err}`);});

console.log("Hey this is also asynchronouss");