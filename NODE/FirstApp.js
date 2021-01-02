console.log('hi');

// Process variables - equivalent of document variable inside 
// browser. In Javascript it comes handy with some of the 
// pre-built functions like geetElementbyId etc.

// console.log(process);

// it also has important functions associted with the object
// for instance the argv, i.e. the command line arguments passed
// when the process was launched

// similarly it also has the other parameters such as process.env
// environment of the user.

// console.log(global);

// similar to the window global in the browser. functions like timout
// set interval. that come with node.js
// functions like the set Timeout , they are part of the dome API, and
// dont come with javascript directly. Similarly, such functions are provided 
// by node, not node v8 engine.

const upper_first = firstname => firstname[0].toUpperCase() + firstname.substring(1);

let firstname = process.argv[2];
firstname = upper_first(firstname);

let lastname = process.argv[3];
lastname = upper_first(lastname);

console.log(`Hello ${firstname} ${lastname}`);