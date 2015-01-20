var React = require('react');
var BoxActions = require('../actions/boxActions');

module.exports = BoxList = React.createClass({

  getDefaultProps: function(){
    return {
      id: '',
      neighbors: [],
      index: 0
    }
  },

  mouseEnterHandler: function() {
    BoxActions.boxMouseEnter();
  },

  mouseLeaveHandler: function() {
    BoxActions.boxMouseLeave();
  },

  onClickHandler: function(e) {
    BoxActions.createBox(this.props.index);
  },

  onRemoveHandler: function(e) {
    e.stopPropagation();
    BoxActions.removeBox(this.props.index, this.props.id);
    this.clearHover();
  },

  clearHover: function() {
    this.mouseLeaveHandler();
  },

  render: function() {
    var neighbors = this.props.neighbors.map(function(neighbor) {
      var key = this.props.id + ' - ' + neighbor;
      return <li className='neighbor' key={key}>{neighbor}</li>
    }, this);

    return (
      <div onMouseEnter={this.mouseEnterHandler} onMouseLeave={this.mouseLeaveHandler} onClick={this.onClickHandler}>
        <div className='header'>
          <h2 className='title'>{this.props.id}</h2>
          <span className='remove' onClick={this.onRemoveHandler}>Remove</span>
        </div>
        <div className='content'>
          <h3>Neighbors</h3>
          <ul className='neighbors'>
            {neighbors}
          </ul>
        </div>
      </div>
    );
  }

});