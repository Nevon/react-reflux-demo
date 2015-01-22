'use strict';

var Reflux = require('reflux');

var NotificationActions = Reflux.createActions([
  'addNotification',
  'removeNotification'
]);

module.exports = NotificationActions;
