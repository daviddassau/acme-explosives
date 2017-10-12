(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
"use strict";

var data = require('./data');

data();
},{"./data":1}]},{},[2]);
