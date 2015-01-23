'use strict';

var React = require('react');
var BoxActions = require('../actions/boxActions');

module.exports = React.createClass({
	propTypes: {
		id: React.PropTypes.string.isRequired,
		neighbors: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
		index: React.PropTypes.number.isRequired
	},

	getDefaultProps: function(){
		return {
			id: '',
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
		BoxActions.createBox(this.props.index);
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
		var neighbors = this.props.neighbors.map(function(neighbor) {
			var key = this.props.id + ' - ' + neighbor;
			/* jshint ignore:start */
			return <li className='neighbor' key={key}>{neighbor}</li>
			/* jshint ignore:end */
		}, this);

		/* jshint ignore:start */
		return (
			<div className='box-action-area' onMouseEnter={this.mouseEnterHandler} onMouseLeave={this.mouseLeaveHandler} onClick={this.onClickHandler}>
				<div className='header'>
					<h2 className='title'>{this.props.id}</h2>
					<div className='remove' onClick={this.onRemoveHandler}>
						<span className='icon'>X</span>
					</div>
				</div>
				<div className='content'>
					<h3 className='list-heading'>Neighbors</h3>
					<ul className='neighbors'>
						{neighbors}
					</ul>
				</div>
			</div>
		);
		/* jshint ignore:end */
	}

});
