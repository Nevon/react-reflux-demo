'use strict';

var React = require('react');
var NotificationActions = require('../actions/notificationActions');

module.exports = React.createClass({

	propTypes: {
		title: React.PropTypes.string.isRequired,
		message: React.PropTypes.string.isRequired,
		uid: React.PropTypes.string.isRequired
	},

	getDefaultProps: function() {
		return {
			title: '',
			message: '',
			uid: ''
		};
	},

	clickHandler: function() {
		NotificationActions.removeNotification(this.props.uid);
	},

	render: function() {
		/* jshint ignore:start */
		return (
			<li key={this.props.uid} onClick={this.clickHandler}>
				<h2 className='title'>{this.props.title}</h2>
				<p className='message'>{this.props.message}</p>
			</li>
		);
		/* jshint ignore:end */
	}

});
