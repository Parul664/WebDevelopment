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
//overridden
fs.writeFile(jupyter,'I am learning Node', err => {
	if(err){
			console.log(`Error : ${err}`);
		}else{
			//read the file jupyter
			console.log("Written to the file");
			fs.readFile(jupyter,`utf-8`,(err,data)=>{
				if(err){
					console.log(err);
				}else{
					console.log(`${jupyter} content : ${data}`);
					fs.appendFile(jupyter,'\n It is so fun!' , err=>{
						if(err){
							console.log(`Error : ${err}`);
				console.log(`${jupyter} content : ${data}`);		}else{
							console.log("Appended to the file");
							fs.readFile(jupyter,`utf-8`,(err,data)=>{
								if(err){
									console.log(`Error : ${err}`);
								}else{
									console.log(`${jupyter} content : ${data}`);
								}
							});
						};
					});
				}
			});
		}
});

// Here we get this pyromid hull which is a source of so many mistakes
// we can get rid of this using promises


console.log('hello! I am asynchronous');
// This statment can run, while javascript is waiting for the file to be reaad written, it does not wait for callbacks to be executed
// next is going to the same code using promises