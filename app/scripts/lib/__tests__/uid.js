'use strict';

jest.dontMock('../uid');
var uid = require('../uid');

describe('Uid', function() {
	it('generates a unique id', function() {
		// Uid only generates 1.6 million possible combinations, so this could theoretically fail
		expect(uid()).not.toBe(uid());
	});

	it('has the right length', function() {
		expect(uid().length).toBe(4);
	});
});
