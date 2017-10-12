"use strict";

let explosives = [];

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
			explosives.push(splodie);
		});
		return typesJSON();
	}).then((results2) => {
		results2.forEach((splodie) => {
			explosives.push(splodie);
		});
		return productsJSON();
	}).then((results3) => {
		results3.forEach((splodie) => {
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



