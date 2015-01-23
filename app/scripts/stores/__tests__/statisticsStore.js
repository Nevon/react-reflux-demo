'use strict';

jest.dontMock('reflux');
jest.dontMock('../statisticsStore');

var statisticsStore, StatisticsActions;

describe('NotificationsStore', function() {
	beforeEach(function() {
		statisticsStore = require('../statisticsStore');
		StatisticsActions = require('../../actions/statisticsActions');
	});

	it('increments addition stat when adding a box', function() {
		expect(statisticsStore.additions).toEqual(0);
		statisticsStore.onCreateBox();
		expect(statisticsStore.additions).toEqual(1);
	});

	it('increments deletion stat when removing a box', function() {
		expect(statisticsStore.deletions).toEqual(0);
		statisticsStore.onRemoveBox();
		expect(statisticsStore.deletions).toEqual(1);
	});

	it('saves changes', function() {
		statisticsStore.saveStatistics = jest.genMockFunction();
		statisticsStore.onCreateBox();
		expect(statisticsStore.saveStatistics).toBeCalledWith();
		statisticsStore.onRemoveBox();
		expect(statisticsStore.saveStatistics).toBeCalledWith();
	});

	it('saves changes to localStorage', function() {
		/* jshint ignore:start */
		localStorage = jest.genMockFunction();
		/* jshint ignore:end */
		localStorage.setItem = jest.genMockFunction();
		statisticsStore.onCreateBox();

		expect(localStorage.setItem).toBeCalledWith('statistics', JSON.stringify({
			additions: 1,
			deletions: 0
		}));

		statisticsStore.onRemoveBox();

		expect(localStorage.setItem).toBeCalledWith('statistics', JSON.stringify({
			additions: 1,
			deletions: 1
		}));
	});
});
