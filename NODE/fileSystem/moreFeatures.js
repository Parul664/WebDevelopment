// more fs.module
const fs = require('fs');
const mars = 'mars.txt';
const venus = 'venus.txt';
const jupyter = 'jupyter.txt';

//delete a file async
fs.unlink("file.txt",err =>{
	if(err){
		console.log(`Error : ${err}`);
	}else{
		console.log("file has been deleted");
	}
})

// more flags are there, we can google them
//copying a file async, this constant will not allow the file to be re-written in case it is already there
fs.copyFile(jupyter, 'jupyter_copy.txt',fs.constants.COPYFILE_EXCL ,err =>{
	if(err){
		console.log(`Error : ${err}`);
	}else{
		console.log("file  Jupyter has been copyed");
	}
});

// create a directory async
// if we want to use full path we need to set recursive =true by default it is false
fs.mkdir("css",{recursive : false},err=>{
	if(err){
		console.log(`Error : ${err}`);
	}else{
		console.log("Directory has been made successfully");
	}
});

//rmdir also similar but we dont have recursive here
fs.rmdir("css",err=>{
	if(err){
		console.log(`Error : ${err}`);
	}else{
		console.log("Directory has been removed successfully");
	}
});