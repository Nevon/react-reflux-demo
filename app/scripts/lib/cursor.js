module.exports = Cursor = function(array) {
	var index = 0;

	this.getIndex = function() {
		return index;
	};

	this.prev = function() {
		index = (!!index ? index : array.length) - 1;
		return array[index];
	};

	this.current = function() {
		return array[index];
	};

	this.next = function() {
		index = (index + 1) % array.length;
		return array[index];
	};

	return this;
};