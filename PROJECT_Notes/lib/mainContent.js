// require node modules
const fs = require('fs');
const path = require('path');

// files and functions from other files
const calculateSizeD = require('./calculateSizeD.js');
const calculateSizeF = require('./calculateSizeF.js');


const buildMainContent = (fullStaticPath, pathname) =>{
	let mainContent = '';
	
	//loop through the elements inside the folder 
	let items;
	try{
		items = fs.readdirSync(fullStaticPath);
		
	}catch(err){
		console.log(`readdirSync Error : ${err}`);
		return `<div class="alert alert-danger">Internal Server Error<div>`;
	}
	
	//get the following elements for each item
	items.forEach(item => {
		
		// store all details in an objects
		let itemDetails = {};

		// name - item
		itemDetails.name = item;


		// icon
		const itemFullStaticPath = path.join(fullStaticPath,item);
		
		//file or directory
		try{
			itemDetails.stats = fs.statSync(itemFullStaticPath);
		}catch(err){
			console.log(`statSync Error : ${err}`);
			return `<div class="alert alert-danger">Internal Server Error<div>`;
		}

		if(itemDetails.stats.isDirectory()){
			itemDetails.icon = '<ion-icon name="folder"></ion-icon>';
			// size
			[itemDetails.size, itemDetails.sizeBytes] = calculateSizeD(itemFullStaticPath);
		}else if(itemDetails.stats.isFile()){
			itemDetails.icon = '<ion-icon name="document"></ion-icon>';
			// size
			[itemDetails.size, itemDetails.sizeBytes] = calculateSizeF(itemDetails.stats);
		}

		// link to the item - we did it like this because this will now be given as a query and it should correspond to the new pathname, and hence just appendin the item to the pathname is enough
		const link = path.join(pathname, item);
		

		// last modified - same for files and folders
		itemDetails.timeStamp = parseInt(itemDetails.stats.mtimeMs);

		// convert timeStamp to date
		itemDetails.date = new Date(itemDetails.timeStamp);
		itemDetails.date = itemDetails.date.toLocaleString();

		mainContent += `<tr data-name="${itemDetails.name}" data-size="${itemDetails.sizeBytes}" data-time="${itemDetails.timeStamp}">
						<td>${itemDetails.icon}<a href = "${link}">${item}</td>
						<td>${itemDetails.size}</td>
						<td>${itemDetails.date}</td></tr>`;


	});
	

		

	return mainContent;
};	

module.exports = buildMainContent;