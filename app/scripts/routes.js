'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('./pages/app.jsx');
var Home = require('./pages/home.jsx');
var NotFound = require('./pages/notFound.jsx');

/* jshint ignore:start */
var routes = (
	<Route name="app" path="/" handler={App}>
		<Route name="home" handler={Home} />
		<DefaultRoute handler={Home}/>
		<NotFoundRoute handler={NotFound}/>
	</Route>
);

module.exports = routes;
/* jshint ignore:end */
