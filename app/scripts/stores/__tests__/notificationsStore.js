'use strict';

jest.dontMock('reflux');
jest.dontMock('../notificationsStore');

var notificationsStore, NotificationActions;

describe('NotificationsStore', function() {
	beforeEach(function() {
		notificationsStore = require('../notificationsStore');
		NotificationActions = require('../../actions/notificationActions');
	});

	it('can add a new notification', function() {
		notificationsStore.onAddNotification('foo', 'bar');
		expect(notificationsStore.notifications.length).toEqual(1);
		expect(notificationsStore.notifications[0].title).toEqual('foo');
		expect(notificationsStore.notifications[0].message).toEqual('bar');
	});

	it('can remove a notification', function() {
		notificationsStore.onAddNotification('foo', 'bar');
		notificationsStore.onAddNotification('baz', 'bang');
		notificationsStore.onAddNotification('zat', 'zing');

		var middleUid = notificationsStore.notifications[1].uid;

		notificationsStore.onRemoveNotification(middleUid);

		expect(notificationsStore.notifications.length).toEqual(2);
		expect(notificationsStore.notifications.map(function(note) { return note.title; })).toEqual(['foo', 'zat']);
	});

	it('displays a notification when a box is removed', function() {
		notificationsStore.onRemoveBox('foo', 'bar');
		expect(NotificationActions.addNotification).toBeCalledWith('Removed box: bar', undefined);
	});
});
