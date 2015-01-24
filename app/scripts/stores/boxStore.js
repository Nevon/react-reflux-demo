'use strict';

var Reflux = require('reflux');
var BoxActions = require('../actions/boxActions');

module.exports = Reflux.createStore({
	listenables: [BoxActions],

	init : function(){
		this.boxes = [];
		this.firstRun = true;

		try {
			var storedFirstRun = JSON.parse(localStorage.getItem('firstRun'));
			this.firstRun = (storedFirstRun !== null) ? !!storedFirstRun : this.firstRun;
		} catch(e) {
			if (e instanceof SyntaxError) {
				localStorage.removeItem('firstRun');
			}
			/*
			 * Normally we'd re-throw any error that isn't a SyntaxError,
			 * but unfortunately that breaks Jest tests. Mocking localStorage works
			 * in vanilla Jasmine, but it doesn't seem to work in Jest.
			 */
			if (e instanceof ReferenceError === false) {
				throw e;
			}
		}
	},

	generateID : function() {
		return (this.boxes.length > 0) ? Math.max.apply(null, this.boxes) + 1 : 0;
	},


	onLoadBoxes: function(){
		this.trigger({
			loading: true
		});
	},

	onLoadBoxesSuccess: function(boxes){
		// An initial box should be created on our initial run
		if (boxes.length === 0 && this.firstRun === true) {
			BoxActions.createBox(0);

			try {
				localStorage.setItem('firstRun', false);
			} catch (e) {
				if (e instanceof ReferenceError === false) {
					throw e;
				}
			}
		}

		this.boxes = boxes;

		this.trigger({
			boxes : this.boxes,
			loading: false
		});
	},

	onLoadBoxesError: function(error){
		this.trigger({
			boxes: this.boxes,
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
		var box = (typeof(id) !== 'undefined') ? id : this.generateID();

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
