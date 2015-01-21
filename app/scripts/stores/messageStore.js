var Reflux = require('reflux');
var BoxActions = require('../actions/boxActions');
var friendlyMessages = require('../resources/friendlyMessages.js');

module.exports = BoxStore = Reflux.createStore({
  listenables: [BoxActions],

  init : function(){
    this.title = '';
    this.message = '';
  },

  onRemoveBox: function(_, id) {
    this.title = 'Removed box: ' + id
    this.message = friendlyMessages[Math.floor(Math.random() * friendlyMessages.length)];

    this.trigger({
      title: this.title,
      message: this.message
    });
  }

});