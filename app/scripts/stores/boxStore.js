'use strict';

var Reflux = require('reflux');
var BoxActions = require('../actions/boxActions');
var uid = require('../lib/uid');

module.exports = Reflux.createStore({
	listenables: [BoxActions],

	init : function(){
		this.boxes = [];
	},


	onLoadBoxes: function(){
		this.trigger({
			loading: true
		});
	},

	onLoadBoxesSuccess: function(boxes){
		// If there were no boxes found in storage, create one initial one
		if (boxes.length === 0) {
			BoxActions.createBox(0);
		}

		this.boxes = boxes;

		this.trigger({
			boxes : this.boxes,
			loading: false
		});
	},

	onLoadBoxesError: function(error){
		this.trigger({
			error : error,
			loading: false
		});
	},

	onBoxMouseEnter: function() {
		this.trigger({
			hovering: true
		});
	},

	onBoxMouseLeave: function() {
		this.trigger({
			hovering: false
		});
	},

	onCreateBox: function(index, id) {
		var box = (typeof(id) !== 'undefined') ? id : uid();

		this.boxes.splice(index, 0, box);

		if (typeof(localStorage) !== 'undefined') {
			localStorage.setItem('boxes', JSON.stringify(this.boxes));
		}

		this.trigger({
			boxes: this.boxes
		});
	},

	onRemoveBox: function(index) {
		this.boxes.splice(index, 1);

		if (typeof(localStorage) !== 'undefined') {
			localStorage.setItem('boxes', JSON.stringify(this.boxes));
		}

		this.trigger({
			boxes: this.boxes
		});
	}

});
