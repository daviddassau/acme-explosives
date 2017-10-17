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
			domStrang +=   `<div class="thumbnail">`;
			domStrang +=     `<h4>${item.name}</h4>`;
			domStrang +=     `<p>${item.description}</p>`;
			domStrang +=     `<p><b>Uses:</b><br />${item.typeDescription}</p>`;
			domStrang +=     `<p>${item.typeName}</p>`;
			domStrang +=   `</div>`;
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

