'use strict';

var React = require('react');
var BoxActions = require('../actions/boxActions');

module.exports = React.createClass({
	propTypes: {
		id: React.PropTypes.number.isRequired,
		neighbors: function(props, propName) {
			if (!Array.isArray(props[propName])) {
				return new Error('Prop "neighbors" is not an array');
			}

			for (var i = 0; props[propName].length > i; i++) {
				if (typeof(props[propName][i]) !== 'number') {
					return new Error('Prop "neighbors" contains non-numeric values');
				}
			}

			if (props[propName].length > 2) {
				return new Error('Box can only have up to two neighbors');
			}
		},
		index: React.PropTypes.number.isRequired
	},

	getDefaultProps: function(){
		return {
			id: 0,
			neighbors: [],
			index: 0
		};
	},

	mouseEnterHandler: function() {
		BoxActions.boxMouseEnter();
	},

	mouseLeaveHandler: function() {
		BoxActions.boxMouseLeave();
	},

	onClickHandler: function() {
		BoxActions.createBox(this.props.index+1);
	},

	onRemoveHandler: function(e) {
		e.stopPropagation();
		BoxActions.removeBox(this.props.index, this.props.id);
		this.clearHover();
	},

	clearHover: function() {
		this.mouseLeaveHandler();
	},

	render: function() {
		var neighbors = this.props.neighbors.map(function(neighbor, index) {
			var key = this.props.id + ' - ' + neighbor,
					classes = React.addons.classSet({
						'neighbor': true,
						'neighbor--left': (index % 2 === 0),
						'neighbor--right': (index % 2 !== 0)
					});
			/* jshint ignore:start */
			return <li className={classes} key={key}>{neighbor}</li>
			/* jshint ignore:end */
		}, this);
		/* jshint ignore:start */
		var content = (this.props.neighbors.length > 0) ? <ul className='neighbors'>{neighbors}</ul> : <span className='empty'>No neighbors</span>;

		return (
			<div className='box-action-area' onMouseEnter={this.mouseEnterHandler} onMouseLeave={this.mouseLeaveHandler} onClick={this.onClickHandler}>
				<div className='header'>
					<h2 className='title'>[{this.props.id}]</h2>
					<div className='remove' onClick={this.onRemoveHandler}>
						<span className='icon'>X</span>
					</div>
				</div>
				<div className='content'>
					{content}
				</div>
			</div>
		);
		/* jshint ignore:end */
	}

});
