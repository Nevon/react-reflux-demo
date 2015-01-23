jest.dontMock('../notifications.jsx');
jest.dontMock('../notification.jsx');
jest.dontMock('react/addons');

var React, TestUtils, NotificationActions, Notifications, NotificationComponent;

describe('Notifications', function() {
	beforeEach(function() {
		React = require('react/addons');
		TestUtils = React.addons.TestUtils;
		NotificationsComponent = require('../notifications.jsx');
		NotificationComponent = require('../notification.jsx');
		NotificationActions = require('../../actions/notificationActions');
		/* jshint ignore:start */
		Notifications = TestUtils.renderIntoDocument(<NotificationsComponent />);
		/* jshint ignore:end */
	});

	it('displays a list of notifications', function() {
		Notifications.onStatusChange({
			notifications: [{
				title: 'Foo',
				message: 'bar',
				uid: 1
			}]
		});

		TestUtils.findRenderedComponentWithType(Notifications, NotificationComponent);
	});
});
