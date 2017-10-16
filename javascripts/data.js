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


