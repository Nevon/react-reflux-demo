'use strict';

var React = require('react');
var BoxStore = require('../stores/boxStore');
var BoxActions = require('../actions/boxActions');
var Box = require('./box.jsx');
var Cursor = require('../lib/cursor');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			boxes : [],
			loading : false,
			error : false
		};
	},

	componentDidMount: function() {
		this.unsubscribe = BoxStore.listen(this.onStatusChange);
		BoxActions.loadBoxes();
	},

	componentWillUnmount: function() {
		this.unsubscribe();
	},

	onStatusChange: function(state) {
		this.setState(state);
	},

	createBox: function() {
		BoxActions.createBox(0);
	},

	getNeighbors: function(index, column, boxes) {
		var neighbors = [],
				isLast = index + 1 === boxes.length;

		if (column === 1) {
			// Box has possibly two neighbors
			neighbors.push(boxes[index - 1]);

			if (!isLast) {
				// Has right neighbor
				neighbors.push(boxes[index + 1]);
			}
		} else if ((column === 0 || column === 3) && !isLast) {
			// Box has only right neighbor
			neighbors.push(boxes[index + 1]);
		} else if (column === 2 || column === 4) {
			// Box has only left neighbor
			neighbors.push(boxes[index - 1]);
		}

		return neighbors;
	},

	render: function() {
		var bgColors = new Cursor(['', 'red', 'green', 'blue']);
		var columns = new Cursor(['third', 'third', 'third', 'half', 'half', 'full']);

		var boxes = this.state.boxes.map(function(box, boxIndex){
			var neighbors = [];
			var boxClasses = ['box'];
			var isLast = boxIndex + 1 === this.state.boxes.length;

			if (boxIndex === 0) {
				boxClasses.push(columns.current());
				boxClasses.push(bgColors.current());
			} else {
				boxClasses.push(columns.next());
				boxClasses.push(bgColors.next());
			}

			if (isLast) {
				boxClasses.push('last');
			}

			neighbors = this.getNeighbors(boxIndex, columns.getIndex(), this.state.boxes);

			/* jshint ignore:start */
			return <li key={box} className={boxClasses.join(' ')}><Box id={box} neighbors={neighbors} index={boxIndex} /></li>;
			/* jshint ignore:end */
		}, this);

		/* jshint ignore:start */
		var content = (this.state.loading === true) ? <div className="message message--loading">Loading...</div> : (this.state.boxes.length === 0) ? <span className="message message--empty" onClick={this.createBox}>Click to create a box</span> : <ul className='clearfix boxes'>{boxes}</ul>;

		return (
			<div>
				{ content }
			</div>
		);
		/* jshint ignore:end */
	}

});
