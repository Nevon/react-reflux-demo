var React = require('react');
var BoxStore = require('../stores/boxStore');
var BoxActions = require('../actions/boxActions');
var Box = require('./box.jsx');
var Cursor = require('../lib/cursor');

module.exports = BoxList = React.createClass({

  getInitialState: function(){
    return {
      boxes : [],
      loading : false,
      error : false
    }
  },

  componentDidMount: function() {
    this.unsubscribe = BoxStore.listen(this.onStatusChange);
    BoxActions.loadBoxes();
  },

  componentWillUnmount: function(){
    this.unsubscribe();
  },

  onStatusChange: function(state){
    this.setState(state);
  },

  render: function() {
    var bgColors = new Cursor(['', 'red', 'green', 'blue']);
    var columns = new Cursor(['third', 'third', 'third', 'half', 'half', 'full']);

    var boxes = this.state.boxes.map(function(box, boxIndex){
      var neighbors = [];
      var boxClasses = ['box'];
      var isLast = boxIndex + 1 === this.state.boxes.length;
      
      if (boxIndex === 0) {
        boxClasses.push(columns.current());
        boxClasses.push(bgColors.current());
      } else {
        boxClasses.push(columns.next());
        boxClasses.push(bgColors.next());
      }

      if (isLast) {
        boxClasses.push('last');
      }

      if (columns.getIndex() === 1) {
        // Box has possibly two neighbors
        neighbors.push(this.state.boxes[boxIndex - 1]);
        
        if (!isLast) {
          // Has right neighbor
          neighbors.push(this.state.boxes[boxIndex + 1]);
        }
      } else if ((columns.getIndex() === 0 || columns.getIndex() === 3) && !isLast) {
        // Box has only right neighbor
        neighbors.push(this.state.boxes[boxIndex + 1]);
      } else if (columns.getIndex() === 2 || columns.getIndex() === 4) {
        // Box has only left neighbor
        neighbors.push(this.state.boxes[boxIndex - 1]);
      }

      return <li key={box} className={boxClasses.join(' ')}><Box id={box} neighbors={neighbors} index={boxIndex} /></li>;
    }, this),
    loading = this.state.loading ? <div>Loading...</div> : '';

    return (
      <div>
        { loading }
        <ul className='clearfix boxes'>
          {boxes}
        </ul>
      </div>
    );
  }

});