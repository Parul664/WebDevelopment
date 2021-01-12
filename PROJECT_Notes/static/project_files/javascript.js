

// loop through the children of bode
const children = $('tbody').children();
// it is an object with indices as keys

// console.log(children);

//convert ti to an array
let children_array = [];
for (let i=0; i<children.length ; i++){
	children_array.push(children[i]);
}

const items = [];

children_array.forEach(element =>{
	const rowDetails = {
		name: element.getAttribute('data-name'),
		size: parseInt(element.getAttribute('data-size')),
		time: parseInt(element.getAttribute('data-time')),
		html: element.outerHTML
	}
	items.push(rowDetails);
});


// Sort Status = though by default ascending but we'll assume that's not the case
const sortStatus = {
	name: 'none', 
	size: 'none',
	time: 'none'
};


const sort = (items, option,type) =>{
	items.sort((item1, item2)=>{
		let val1, val2;
		if(type === 'name'){
			val1 = item1.name.toUpperCase();
			val2 = item2.name.toUpperCase();
			
		}else if(type == 'size'){
			val1 = item1.size;
			val2 = item2.size;
		}else{
			val1 = item1.time;
			val2 = item2.time;
		}
		if(val1< val2){
			return -1;
		}else if(val1>val2){
			return 1;
		}else{
			return 0;
		}

	});
	if(option==='down'){
		items.reverse();
	}
};



// fill the table body with items
const fill_table_body = items =>{

	//contains only the html content. It is an aray
	const content = items.map(element => element.html).join('');
	$('tbody').html(content);
}



// event listeners
document.getElementById('table_head_row').addEventListener('click',event=>{
	// tells which element has been clicked
	if(event.target){
		

		//clear icons
		$('ion-icon').remove();

		if(['none','down'].includes(sortStatus[event.target.id] )){
			// sort in ascending order
			sort(items,'up',event.target.id);
			sortStatus[event.target.id] = 'up';
			
			// add itcon
			event.target.innerHTML += ' <ion-icon name="chevron-down-circle-outline"></ion-icon>';

		}else if(sortStatus[event.target.id] === 'up'){
			// sort in descending order
			sort(items,'down',event.target.id);
			sortStatus[event.target.id] = 'down';
			event.target.innerHTML += ' <ion-icon name="chevron-up-circle-outline"></ion-icon>';
		}
		fill_table_body(items);
	
	} 
});
