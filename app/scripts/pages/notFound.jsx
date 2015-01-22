'use strict';

var React = require('react');

var NotFound = React.createClass({

	render: function() {
		/* jshint ignore:start */
		return (
			<div>
				<h1>404</h1>
				<p>Sorry, but we couldn’t find what you were looking for</p>
			</div>
		);
		/* jshint ignore:end */
	}

});

module.exports = NotFound;
