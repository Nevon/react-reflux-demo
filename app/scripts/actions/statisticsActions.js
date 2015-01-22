'use strict';

var Reflux = require('reflux');

var StatisticsActions = Reflux.createActions([
  'loadStatistics',
  'loadStatisticsSuccess',
  'loadStatisticsError'
]);

StatisticsActions.loadStatistics.preEmit = function(){
  var statistics = {};

  if (typeof(localStorage) !== 'undefined') {
    var storedStatistics = JSON.parse(localStorage.getItem('statistics'));

    if (storedStatistics) {
      statistics = storedStatistics;
    }
  }

  StatisticsActions.loadStatisticsSuccess(statistics);
};

module.exports = StatisticsActions;
