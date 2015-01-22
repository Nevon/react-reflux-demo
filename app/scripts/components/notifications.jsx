/*jshint -W079 */
'use strict';

var React = require('react/addons');
var Notification = require('./notification.jsx');
var NotificationsStore = require('../stores/notificationsStore');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({

	getInitialState: function(){
		return {
			notifications: []
		};
	},

	componentDidMount: function() {
		this.unsubscribe = NotificationsStore.listen(this.onStatusChange);
	},

	componentWillUnmount: function(){
		this.unsubscribe();
	},

	onStatusChange: function(state){
		this.setState(state);
	},

	render: function() {
		/* jshint ignore:start */
		var notifications = this.state.notifications.reverse().map(function(note) {
			return <Notification uid={note.uid} title={note.title} message={note.message} />;
		});

		return (
			<ol className='notifications'>
				<ReactCSSTransitionGroup transitionName='notification'>
					{notifications}
				</ReactCSSTransitionGroup>
			</ol>
		);
		/* jshint ignore:end */
	}

});
