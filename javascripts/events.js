"use strict";

var dom = require('./dom');

$('#gunpowderSelector').click((e) => {
	// Run domStringGunpowder from dom.js
	// console.log(e.target);
	dom(e);
});


module.exports = {};