(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

let explosives = [];
let categories = [];
let types = [];

const categoriesJSON = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./db/categories.json').done((dataCategories) => {
			resolve(dataCategories.categories);
		}).fail((errorCategories) => {
			reject(errorCategories);
		});
	});
};

const typesJSON = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./db/types.json').done((dataTypes) => {
			resolve(dataTypes.types);
		}).fail((errorTypes) => {
			reject(errorTypes);
		});
	});
};

const productsJSON = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./db/products.json').done((dataProducts) => {
			resolve(dataProducts.products);
		}).fail((errorProducts) => {
			reject(errorProducts);
		});
	});
};


const explosivesGetter = () => {
	categoriesJSON().then((results1) => {
		results1.forEach((splodie) => {
			categories.push(splodie);
		});
		return typesJSON();
	}).then((results2) => {
		results2.forEach((splodie) => {
			categories.forEach((category) => {
				if (splodie.category === category.id){
					splodie.categoryId = category.id;
					splodie.categoryName = category.name;
				}
			});
			types.push(splodie);
		});
		return productsJSON();
	}).then((results3) => {
		results3.forEach((splodie) => {
			let key = Object.keys(splodie)[0];
			splodie = splodie[key];
			types.forEach((type) => {
				if (splodie.type === type.id){
					splodie.typeName = type.name;
					splodie.typeDescription = type.description;
					splodie.categoryId = type.categoryId;
					splodie.categoryName = type.categoryName;
				}
			});
			explosives.push(splodie);
		});
		console.log("explosives", explosives);
	});
};

const initializer = () => {
	explosivesGetter();
};

const getExplosives = () => {
	return explosives;
};


module.exports = {initializer, getExplosives};



},{}],2:[function(require,module,exports){
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





},{"./data":1}],3:[function(require,module,exports){
"use strict";

var dom = require('./dom');

$('#gunpowderSelector').click((e) => {
	// Run domStringGunpowder from dom.js
	// console.log(e.target);
	dom(e);
});


module.exports = {};
},{"./dom":2}],4:[function(require,module,exports){
"use strict";

var data = require('./data');
require('./events');

$(document).ready(function() {
	data.initializer();
});
},{"./data":1,"./events":3}]},{},[4]);
