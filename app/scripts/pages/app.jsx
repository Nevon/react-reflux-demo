'use strict';

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var BoxStore = require('../stores/boxStore');
var Header = require('../components/header.jsx');

var App = React.createClass({
  getInitialState: function(){
    return {
      hovering: false,
      innerBackground: '#eaeaea'
    };
  },

  componentDidMount: function() {
    this.unsubscribe = BoxStore.listen(this.onStatusChange);
  },

  componentWillUnmount: function(){
    this.unsubscribe();
  },

  onStatusChange: function(state){
    if (typeof(state.boxes) !== 'undefined') {
      state.innerBackground = this.generateBackgroundColor(state.boxes.length);
    }

    this.setState(state);
  },

  generateBackgroundColor: function(num) {
    var range = 75,
        start = 255 - range;

    // Logistic function to approach 0 as the number of boxes grows
    var colorValue = Math.round(start - (range * 1 / (1 + Math.pow(Math.E, 1 - num))));

    var componentToHex = function(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    var rgbToHex = function(r, g, b) {
        return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
    };

    return rgbToHex(colorValue, colorValue, colorValue);
  },

  render: function () {
    var outerClasses = ['container', 'container--outer', (this.state.hovering === true) ? 'hovering' : ''].join(' ');
    var innerClasses = ['container', 'container--inner', (this.state.hovering === true) ? 'hovering' : ''].join(' ');
    var innerStyle = {
      backgroundColor: this.state.innerBackground
    };

    /* jshint ignore:start */
    return (
      <div>
        <Header />
        <div className={outerClasses}>
          <div className={innerClasses} style={innerStyle}>
            <RouteHandler/>
          </div>
        </div>
      </div>
    );
    /* jshint ignore:end */
  }
});

module.exports = App;
