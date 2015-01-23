jest.dontMock('../header.jsx');
jest.dontMock('react/addons');

var React, TestUtils, StatisticsActions, Header, HeaderComponent;

describe('Header', function() {
	beforeEach(function() {
		React = require('react/addons');
		TestUtils = React.addons.TestUtils;
		HeaderComponent = require('../header.jsx');
		StatisticsActions = require('../../actions/statisticsActions');
		/* jshint ignore:start */
		Header = TestUtils.renderIntoDocument(<HeaderComponent />);
		/* jshint ignore:end */
	});

	it('displays the app title', function() {
		expect(TestUtils.findRenderedDOMComponentWithClass(Header, 'title').getDOMNode().textContent).toEqual('Boxes');
	});

	it('displays the current box count', function() {
		expect(TestUtils.findRenderedDOMComponentWithClass(Header, 'current-value').getDOMNode().textContent).toEqual('0');
		Header.onBoxChange({boxes: ['foo', 'bar']});
		expect(TestUtils.findRenderedDOMComponentWithClass(Header, 'current-value').getDOMNode().textContent).toEqual('2');
	});

	it('displays the total amount of additions and deletions', function() {
		expect(TestUtils.findRenderedDOMComponentWithClass(Header, 'additions-value').getDOMNode().textContent).toEqual('0');
		expect(TestUtils.findRenderedDOMComponentWithClass(Header, 'deletions-value').getDOMNode().textContent).toEqual('0');
		Header.onStatisticsChange({
			additions: 10,
			deletions: 5
		});
		expect(TestUtils.findRenderedDOMComponentWithClass(Header, 'additions-value').getDOMNode().textContent).toEqual('10');
		expect(TestUtils.findRenderedDOMComponentWithClass(Header, 'deletions-value').getDOMNode().textContent).toEqual('5');
	});

	it('loads statistics on mount', function() {
		expect(StatisticsActions.loadStatistics).toBeCalledWith();
	});
});
