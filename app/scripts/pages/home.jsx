var React = require('react');
var BoxList = require('../components/boxList.jsx');
var Notifications = require('../components/notifications.jsx');

var Home = React.createClass({

  render: function() {
  	/* jshint ignore:start */
    return (
      <div>
      	<Notifications />
        <BoxList />
      </div>
    );
    /* jshint ignore:end */
  }

});

module.exports = Home;