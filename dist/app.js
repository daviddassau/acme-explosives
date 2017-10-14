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
			console.log(types);
		});
		return productsJSON();
	}).then((results3) => {
		results3.forEach((splodie) => {
			// explosives.push(splodie);
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





// 3rd one we did: best way to do it for order dependent data load (dino data is independent of each other and doesn't require this method)
// let dinoGetter = () => {
//     firstDinosaurJSON().then(function(results1){
//         results1.forEach(function(dino){
//             dinosaurs.push(dino);
//         });
//         return secondDinosaurJSON();
//     }).then(function(results2){
//         results2.forEach(function(dino) {
//                 dinosaurs.push(dino);
//         });
//         return thirdDinosaurJSON();
//     }).then(function(results3){
//         results3.forEach(function(dino) {
//             dinosaurs.push(dino);
//         });
//         console.log("dinosaurs", dinosaurs);
//         makeDinos();
//     });
// };

// let makeDinos = () => {
//     dinosaurs.forEach(function(dino){
//         dom(dino);
//     });
// };





// const dinoGetter = () => {
// 	Promise.all([firstDinosaurJSON(), secondDinosaurJSON(), thirdDinosaurJSON()]).then((results) => {
// 		allTheCats().then((cats) => {
// 		results.forEach((result) => {
// 			result.forEach((dino) => {
// 				dino.snacks = [];
// 				dino.catIds.forEach((catId) => {
// 					cats.forEach((cat) => {
// 						if(cat.id === catId){
// 							dino.snacks.push(cat);
// 						}
// 					});
// 				});
// 				dinosaurs.push(dino);
// 			});
// 		  });
// 		makeDinos();
// 		});
// 		console.log("dino", dinosaurs);
// 	}).catch((error) => {
// 		console.log("error from Promise.all", error);
// 	});
// };




},{}],2:[function(require,module,exports){
"use strict";

var data = require('./data');

$(document).ready(function() {
	data.initializer();
});
},{"./data":1}]},{},[2]);
