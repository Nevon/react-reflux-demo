'use strict';

var Reflux = require('reflux');

var BoxActions = Reflux.createActions([
  'loadBoxes',
  'loadBoxesSuccess',
  'loadBoxesError',
  'boxMouseEnter',
  'boxMouseLeave',
  'createBox',
  'removeBox'
]);

BoxActions.loadBoxes.preEmit = function(){
  var boxes = [];

  if (typeof(localStorage) !== 'undefined') {
    var storedBoxes = JSON.parse(localStorage.getItem('boxes'));

    if (storedBoxes) {
      boxes = storedBoxes;
    }
  }

  BoxActions.loadBoxesSuccess(boxes);
};

module.exports = BoxActions;
