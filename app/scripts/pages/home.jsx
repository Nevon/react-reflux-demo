var React = require('react');
var BoxList = require('../components/boxList.jsx');
var Notifications = require('../components/notifications.jsx');

var Home = React.createClass({

  render: function() {
    return (
      <div>
      	<Notifications />
        <BoxList />
      </div>
    );
  }

});

module.exports = Home;