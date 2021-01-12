
const calculateSizeF = stats => {
	
	const filesizeBytes = stats.size; //directly in bites

	const uints ="BKMGT";

	const index = Math.floor(Math.log10(filesizeBytes)/3);
	const filesizeHuman = (filesizeBytes/Math.pow(1000,index)).toFixed(1);

	const unit = uints[index];

	return [`${filesizeHuman}${unit}`,filesizeBytes];
}

module.exports = calculateSizeF;

// ...1000...1000000...1000000000
//     K        M          G
// log 10(size)
//  3          6           9
// log 10(size)
//   1         2           3

