var Reflux = require('reflux');
var BoxActions = require('../actions/boxActions');
var StatisticsActions = require('../actions/statisticsActions');

module.exports = StatisticsStore = Reflux.createStore({
  listenables: [BoxActions, StatisticsActions],

  init : function(){
    this.additions = 0;
    this.deletions = 0;
  },

  onLoadStatisticsSuccess: function(stats){
    this.additions = (stats.additions) ? stats.additions : 0;
    this.deletions = (stats.deletions) ? stats.deletions : 0;
    this.trigger(stats);
  },

  onCreateBox: function() {
    this.additions++;

    this.saveStatistics();
    
    this.trigger({
      additions: this.additions
    });
  },

  onRemoveBox: function(index) {
    this.deletions++;

    this.saveStatistics();
    
    this.trigger({
      deletions: this.deletions
    });
  },

  saveStatistics: function() {
    if (typeof(localStorage) !== 'undefined') {
      localStorage.setItem('statistics', JSON.stringify({
        additions: this.additions,
        deletions: this.deletions
      }));

      return true;
    }

    return false;
  }

});