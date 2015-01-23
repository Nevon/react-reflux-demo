'use strict';

jest.dontMock('../colors');
var colors = require('../colors');

describe('Colors', function() {
	it('converts from single byte value to hex', function() {
		expect(colors.componentToHex(200)).toEqual('c8');
	});

	it('pads 1 character hex strings with 0', function() {
		expect(colors.componentToHex(7)).toEqual('07');
	});

	it('converts rgb triplet to hex', function() {
		expect(colors.rgbToHex(0, 0, 0)).toEqual('#000000');
		expect(colors.rgbToHex(255, 255, 255)).toEqual('#ffffff');
		expect(colors.rgbToHex(64, 128, 192)).toEqual('#4080c0');
	});
});
