console.log(module);

//export property in this shows you all the variables and functions that
// we exported from other files to others

const greeting = require('./libs/greeting.js');
greeting();

// because we were appending the the exports, we have to tell
// which function are we currently talking about
const average = require('./libs/school.js').average;
console.log(average([70,55,90,100]));

console.log(require('./libs/school.js').grade);