'use strict';

jest.dontMock('reflux');
jest.dontMock('../boxStore');

var boxStore;

describe('BoxStore', function() {
	beforeEach(function() {
		boxStore = require('../boxStore');
	});

	it('has a count of boxes', function() {
		boxStore.onLoadBoxesSuccess(['foo', 'bar']);
		expect(boxStore.boxes.length).toEqual(2);
	});

	it('can create a new box', function() {
		boxStore.onCreateBox(0);
		expect(boxStore.boxes.length).toEqual(1);
	});

	it('can create a new box at a given index', function() {
		boxStore.onLoadBoxesSuccess(['foo', 'bar', 'baz']);
		boxStore.onCreateBox(1, 'new');
		expect(boxStore.boxes).toEqual(['foo', 'new', 'bar', 'baz']);
	});

	it('can remove a box at a given index', function() {
		boxStore.onLoadBoxesSuccess(['foo', 'bar', 'baz']);
		boxStore.onRemoveBox(1);
		expect(boxStore.boxes).toEqual(['foo', 'baz']);
	});
});
