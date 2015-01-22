'use strict';

var React = require('react');
var BoxStore = require('../stores/boxStore');
var StatisticsStore = require('../stores/statisticsStore');
var StatisticsActions = require('../actions/statisticsActions');

module.exports = React.createClass({

	getInitialState: function(){
		return {
			additions: 0,
			deletions: 0,
			currentTotal: 0
		};
	},

	componentDidMount: function() {
		this.unsubscribeFromBoxStore = BoxStore.listen(this.onBoxChange);
		this.unsubscribeFromStatisticsStore = StatisticsStore.listen(this.onStatisticsChange);

		StatisticsActions.loadStatistics();
	},

	componentWillUnmount: function(){
		this.unsubscribeFromBoxStore();
		this.unsubscribeFromStatisticsStore();
	},

	onBoxChange: function(state){
		if (typeof(state.boxes) !== 'undefined') {
			this.setState({
				currentTotal: state.boxes.length
			});
		}
	},

	onStatisticsChange: function(state){
		this.setState(state);
	},

	render: function() {
		/* jshint ignore:start */
		return (
			<header className='header-bar'>
				<h1 className='title'>Boxes</h1>
				<dl>
					<dt className='current-heading'>Current:</dt>
					<dd className='current-value'>{this.state.currentTotal}</dd>
					<dt className='additions-heading'>Additions:</dt>
					<dd className='additions-value'>{this.state.additions}</dd>
					<dt className='deletions-heading'>Deletions:</dt>
					<dd className='deletions-value'>{this.state.deletions}</dd>
				</dl>
			</header>
		);
		/* jshint ignore:end */
	}

});
