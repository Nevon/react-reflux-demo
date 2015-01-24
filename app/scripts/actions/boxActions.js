'use strict';

var Reflux = require('reflux');

var BoxActions = Reflux.createActions([
	'loadBoxes',
	'loadBoxesSuccess',
	'loadBoxesError',
	'boxMouseEnter',
	'boxMouseLeave',
	'createBox',
	'removeBox'
]);

BoxActions.loadBoxes.preEmit = function(){
	var boxes = [],
			storageKey = 'boxes';

	if (typeof(localStorage) !== 'undefined') {
		var storedBoxes;

		try {
			storedBoxes = JSON.parse(localStorage.getItem(storageKey));
		} catch(e) {
			if (e instanceof SyntaxError) {
				// If the JSON in storage is corrupt, get rid of it
				localStorage.removeItem(storageKey);
			} else {
				throw e;
			}
		}

		if (storedBoxes) {
			// Filter out non-numeric items, in case they got in there somehow
			boxes = storedBoxes.filter(function(box) {
				return typeof(box) === 'number';
			});
		}
	}

	BoxActions.loadBoxesSuccess(boxes);
};

module.exports = BoxActions;
