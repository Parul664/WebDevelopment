// We'll have to command line to get the directory size
const {execSync} = require('child_process');
// const execSync = require('child_process').execSync; // alternate


const calculateSizeD = (itemFullStaticPath) => {
	// escape spaces, tabs, newlines
	const itemFullStaticPathCleaned = itemFullStaticPath.replace(/\s/g, '\ ');

	const commandOutput = execSync(`du -sh "${itemFullStaticPathCleaned}"`).toString();


	
	// remove all space tabs etc and then split it and get first element
	let filesize = commandOutput.replace(/\s/g,'');
	filesize = filesize.split('/')[0]; 

	//unit
	const filesizeUnit = filesize.replace(/\d|\./g,'');

	//size number
	const filesizeNumber = parseFloat(filesize.replace(/[a-z]/i,''));
	
	// all different possible Units
	const units = "BKMGT";
	const filesizeBytes = filesizeNumber * Math.pow(1024,units.indexOf(filesizeUnit));

	return [filesize,filesizeBytes];
}

module.exports = calculateSizeD;

// conversion into bytes
// 1K => 1024 B (1024^0)
// 1M => 1024*1024 B (1024^1)
// 1G => 1024*1024*1024 B (1024^2)
// 1T => 1024*1024*1024*1024 B (1024^3)

