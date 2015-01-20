var Reflux = require('reflux');
var BoxActions = require('../actions/boxActions');

module.exports = BoxStore = Reflux.createStore({
  listenables: [BoxActions],

  init : function(){
    this.message = '';
  },

  onRemoveBox: function(_, id) {
    this.message = 'Removed box: ' + id

    this.trigger({
      message: this.message
    });
  }

});