'use strict';

var componentToHex = function(c) {
		var hex = c.toString(16);
		return hex.length === 1 ? '0' + hex : hex;
};

var rgbToHex = function(r, g, b) {
		return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

module.exports = {
	componentToHex: componentToHex,
	rgbToHex: rgbToHex
};
