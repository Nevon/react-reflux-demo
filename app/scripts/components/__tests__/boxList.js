jest.dontMock('../boxList.jsx');
jest.dontMock('../box.jsx');
jest.dontMock('../../lib/cursor.js');
jest.dontMock('react/addons');

var React, BoxListComponent, BoxList, TestUtils, BoxActions, BoxComponent, Cursor;

describe('BoxList', function() {
	beforeEach(function() {
		React = require('react/addons');
		TestUtils = React.addons.TestUtils;
		BoxListComponent = require('../boxList.jsx');
		BoxComponent = require('../box.jsx');
		/* jshint ignore:start */
		BoxList = TestUtils.renderIntoDocument(<BoxListComponent />);
		/* jshint ignore:end */
		BoxActions = require('../../actions/boxActions');
		Cursor = require('../../lib/cursor.js');
	});

	it('displays a loader', function() {
		expect(TestUtils.scryRenderedDOMComponentsWithClass(BoxList, 'message--loading').length).toBe(0);
		BoxList.onStatusChange({loading: true});
		var loader = TestUtils.findRenderedDOMComponentWithClass(BoxList, 'message--loading');
		expect(loader.getDOMNode().textContent).toBe('Loading...');
	});

	it('contains no boxes by default', function() {
		expect(BoxList.state.boxes.length).toEqual(0);
		expect(TestUtils.scryRenderedComponentsWithType(BoxList, BoxComponent).length).toBe(0);
	});

	it('contains a number of boxes', function() {
		BoxList.onStatusChange({boxes: [1, 2]});
		expect(BoxList.state.boxes.length).toEqual(2);
		expect(TestUtils.scryRenderedComponentsWithType(BoxList, BoxComponent).length).toBe(2);
	});

	it('calculates horizontal neighbors', function() {
		var boxes = [1, 2, 3, 4, 5, 6, 7];

		// Only right neighbor in column of three
		expect(BoxList.getNeighbors(0, 0, boxes)).toEqual([2]);

		// Only left neighbor in column of three
		expect(BoxList.getNeighbors(2, 2, boxes)).toEqual([2]);

		// Both neighbors in column of three
		expect(BoxList.getNeighbors(1, 1, boxes)).toEqual([1, 3]);

		// Only right neighbor in column of 2
		expect(BoxList.getNeighbors(3, 3, boxes)).toEqual([5]);

		// Only left neighbor in column of 2
		expect(BoxList.getNeighbors(4, 4, boxes)).toEqual([4]);

		// No neighbors in single column
		expect(BoxList.getNeighbors(5, 5, boxes)).toEqual([]);

		// No neighbor for last, lone box in column of three
		expect(BoxList.getNeighbors(6, 6, boxes)).toEqual([]);
	});

	it('allows you to create a box when there are none', function() {
		var newBoxButton = TestUtils.findRenderedDOMComponentWithClass(BoxList, 'message--empty');
		expect(newBoxButton.getDOMNode().textContent).toBe('Click to create a box');
		TestUtils.Simulate.click(newBoxButton.getDOMNode());
		expect(BoxActions.createBox).toBeCalledWith(0);
	});

	it('tries to load boxes after mounting', function() {
		expect(BoxActions.loadBoxes).toBeCalledWith();
	});
});
