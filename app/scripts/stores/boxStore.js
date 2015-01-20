var Reflux = require('reflux');
var BoxActions = require('../actions/boxActions');
var uuid = require('uuid');

module.exports = BoxStore = Reflux.createStore({
  listenables: [BoxActions],

  init : function(){
    this.boxes = [];
  },


  onLoadBoxes: function(){
    this.trigger({ 
      loading: true
    });
  },

  onLoadBoxesSuccess: function(boxes){
    this.boxes = boxes;

    this.trigger({ 
      boxes : this.boxes,
      loading: false
    });
  },

  onLoadBoxesError: function(error){
    this.trigger({ 
      error : error,
      loading: false
    });
  },

  onBoxMouseEnter: function() {
    this.trigger({
      hovering: true
    });
  },

  onBoxMouseLeave: function() {
    this.trigger({
      hovering: false
    });
  },

  onCreateBox: function(index) {
    var box = this.generateId();

    this.boxes.splice(index+1, 0, box);

    if (typeof(localStorage) !== 'undefined') {
      localStorage.setItem('boxes', JSON.stringify(this.boxes));
    }
    
    this.trigger({
      boxes: this.boxes
    });
  },

  onRemoveBox: function(index) {
    this.boxes.splice(index, 1)

    if (typeof(localStorage) !== 'undefined') {
      localStorage.setItem('boxes', JSON.stringify(this.boxes));
    }

    this.trigger({
      boxes: this.boxes
    });
  },

  generateId: function() {
    return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
  }

});