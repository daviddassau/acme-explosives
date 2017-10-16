"use strict";

let getExplosives = require('./data');

let outputDiv = $('#explosives');

// Printing the Gunpowder category
const domStringGunpowder = (e) => {
	let domStrang = '';
	let data = getExplosives.getExplosives();
	data.forEach((item) => {
		console.log('item', item.categoryName);
		console.log(e.target.innerHTML);
		if(e.target.innerHTML === item.categoryName){
			domStrang += `<div class="col-md-4">`;
			domStrang +=   `<p>${item.name}</p>`;
			domStrang +=   `<p>${item.description}</p>`;
			domStrang += `</div>`;
		}
	});
	printToDomGunpowder(domStrang);
};

// Print to Dom function Gunpowder
const printToDomGunpowder = (strang) => {
	outputDiv.append(strang);
};





// Module Export
module.exports = domStringGunpowder;




