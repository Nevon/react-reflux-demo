jest.dontMock('../box.jsx');
jest.dontMock('react/addons');

var React, TestUtils, BoxActions, Box, BoxComponent;

describe('Box', function() {
	beforeEach(function() {
		React = require('react/addons');
		TestUtils = React.addons.TestUtils;
		BoxComponent = require('../box.jsx');
		BoxActions = require('../../actions/boxActions');
	});

	it('displays its ID in the header', function() {
		var id = 0;
		/* jshint ignore:start */
		Box = TestUtils.renderIntoDocument(<BoxComponent id={id} />);
		/* jshint ignore:end */
		expect(TestUtils.findRenderedDOMComponentWithClass(Box, 'title').getDOMNode().textContent).toEqual('[' + id + ']');
	});

	it('displays a list of neighbors', function() {
		var neighbors = [1, 2];
		/* jshint ignore:start */
		Box = TestUtils.renderIntoDocument(<BoxComponent neighbors={neighbors} />);
		/* jshint ignore:end */
		expect(TestUtils.scryRenderedDOMComponentsWithClass(Box, 'neighbor').length).toBe(2);
	});

	it('creates a new box when clicked on', function() {
		var id = 1,
				index = 3;
		/* jshint ignore:start */
		Box = TestUtils.renderIntoDocument(<BoxComponent id={id} index={index} />);
		/* jshint ignore:end */
		TestUtils.Simulate.click(Box.getDOMNode());
		expect(BoxActions.createBox).toBeCalledWith(4);
	});

	it('can be removed', function() {
		var id = 1,
				index = 0;
		/* jshint ignore:start */
		Box = TestUtils.renderIntoDocument(<BoxComponent id={id} index={index} />);
		/* jshint ignore:end */
		var removeButton = TestUtils.findRenderedDOMComponentWithClass(Box, 'remove');
		TestUtils.Simulate.click(removeButton.getDOMNode());
		expect(BoxActions.removeBox).toBeCalledWith(index, id);
	});

	xit('reacts to being hovered over', function() {
		// Currently won't work due to facebook/react#1297
		/* jshint ignore:start */
		Box = TestUtils.renderIntoDocument(<BoxComponent />);
		/* jshint ignore:end */
		TestUtils.Simulate.mouseEnter(Box.getDOMNode());
		expect(BoxActions.boxMouseEnter).toBeCalledWith();
		TestUtils.Simulate.mouseLeave(Box.getDOMNode());
		expect(BoxActions.boxMouseLeave).toBeCalledWith();
	});
});
