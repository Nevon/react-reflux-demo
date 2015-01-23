'use strict';

var Reflux = require('reflux');
var BoxActions = require('../actions/boxActions');
var NotificationActions = require('../actions/notificationActions');
var friendlyMessages = require('../resources/friendlyMessages');

module.exports = Reflux.createStore({
	listenables: [BoxActions, NotificationActions],

	init : function(){
		this.uid = 0;
		this.notifications = [];
	},

	onAddNotification: function(title, message) {
		var uid = this.uid;
		var notification = {
			title: title,
			message: message,
			uid: this.uid,
			timeout: setTimeout(function() {
				NotificationActions.removeNotification(uid);
			}, 2500)
		};

		this.notifications.push(notification);

		this.uid += 1;

		this.trigger({
			notifications: this.notifications
		});
	},

	onRemoveNotification: function(uid) {
		this.notifications = this.notifications.filter(function(el) {
			return el.uid !== uid;
		});

		this.trigger({
			notifications: this.notifications
		});
	},

	getRandomFromArray: function(list) {
		return list[Math.floor(Math.random() * list.length)];
	},

	onRemoveBox: function(_, id) {
		var title = 'Removed box: ' + id;
		var message = this.getRandomFromArray(friendlyMessages);
		NotificationActions.addNotification(title, message);
	}

});
