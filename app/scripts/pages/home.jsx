var React = require('react');
var BoxList = require('../components/boxList.jsx');
var Message = require('../components/message.jsx');

var Home = React.createClass({

  render: function() {
    return (
      <div>
      	<Message />
        <BoxList />
      </div>
    );
  }

});

module.exports = Home;