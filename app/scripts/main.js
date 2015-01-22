var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

Router.run(routes, function (Handler) {
	/* jshint ignore:start */
  React.render(<Handler/>, document.body);
  /* jshint ignore:end */
});