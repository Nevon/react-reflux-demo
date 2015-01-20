var React = require('react');

var NotFound = React.createClass({

  render: function() {
    return (
      <div>
        <h1>404</h1>
        <p>Sorry, but we couldn’t find what you were looking for</p>
      </div>
    );
  }

});

module.exports = NotFound;