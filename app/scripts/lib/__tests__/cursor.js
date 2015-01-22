'use strict';

jest.dontMock('../cursor');
var Cursor = require('../cursor');

describe('Cursor', function() {
	it('gets you the current item', function() {
		var arr = ['first', 'second', 'third'];
		var c = new Cursor(arr);

		expect(c.current()).toBe('first');
	});

	it('gets you sequential items', function() {
		var arr = ['first', 'second', 'third'];
		var c = new Cursor(arr);

		expect(c.next()).toBe('second');
		expect(c.next()).toBe('third');
	});

	it('wraps around the array', function() {
		var arr = ['first', 'second'];
		var c = new Cursor(arr);

		expect(c.next()).toBe('second');
		expect(c.next()).toBe('first');
		expect(c.prev()).toBe('second');
	});

	it('maintains the correct index going backwards and forwards', function() {
		var arr = ['first', 'second', 'third'];
		var c = new Cursor(arr);

		expect(c.getIndex()).toBe(0);
		c.next();
		expect(c.getIndex()).toBe(1);
		c.prev();
		expect(c.getIndex()).toBe(0);
	});
});
