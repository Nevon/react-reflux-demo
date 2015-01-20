var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var BoxStore = require('../stores/boxStore');

var App = React.createClass({
  getInitialState: function(){
    return {
      hovering: false
    }
  },

  componentDidMount: function() {
    this.unsubscribe = BoxStore.listen(this.onStatusChange);
  },

  componentWillUnmount: function(){
    this.unsubscribe();
  },

  onStatusChange: function(state){
    this.setState(state);
  },

  render: function () {
    outerClasses = ['container', 'container--outer', (this.state.hovering === true) ? 'hovering' : ''].join(' ');
    innerClasses = ['container', 'container--inner', (this.state.hovering === true) ? 'hovering' : ''].join(' ');
    
    return (
      <div className={outerClasses}>
        <div className={innerClasses}>
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

module.exports = App;