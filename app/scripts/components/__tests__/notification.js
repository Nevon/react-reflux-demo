jest.dontMock('../notification.jsx');
jest.dontMock('react/addons');

var React, TestUtils, NotificationActions, Note, NotificationComponent;

describe('Notification', function() {
	beforeEach(function() {
		React = require('react/addons');
		TestUtils = React.addons.TestUtils;
		NotificationComponent = require('../notification.jsx');
		NotificationActions = require('../../actions/notificationActions');
		/* jshint ignore:start */
		var uid = 1;
		Note = TestUtils.renderIntoDocument(<NotificationComponent  uid={uid} title='bar' message='baz' />);
		/* jshint ignore:end */
	});

	it('displays title and message', function() {
		expect(TestUtils.findRenderedDOMComponentWithClass(Note, 'title').getDOMNode().textContent).toEqual('bar');
		expect(TestUtils.findRenderedDOMComponentWithClass(Note, 'message').getDOMNode().textContent).toEqual('baz');
	});

	it('is dismissed when clicked on', function() {
		TestUtils.Simulate.click(Note.getDOMNode());

		expect(NotificationActions.removeNotification).toBeCalledWith(1);
	});
});
