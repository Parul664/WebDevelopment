// here we are just appending the function to exports,unlike in the 
// file greeting.js where we were putting full exports equal to that

module.exports.average = array =>{
	let sum = 0;
	array.forEach(element => {sum += element});
	return (sum/array.length).toFixed(2);
}

// adding a grades object
module.exports.grade = {
	best: 97,
	average : 58
}