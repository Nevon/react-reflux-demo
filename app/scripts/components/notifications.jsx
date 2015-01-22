var React = require('react/addons');
var Notification = require('./notification.jsx');
var NotificationsStore = require('../stores/notificationsStore');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = Message = React.createClass({

  getInitialState: function(){
    return {
      notifications: []
    };
  },

  componentDidMount: function() {
    this.unsubscribe = NotificationsStore.listen(this.onStatusChange);
  },

  componentWillUnmount: function(){
    this.unsubscribe();
  },

  onStatusChange: function(state){
    this.setState(state);
  },

  notificationClickHandler: function() {

  },

  render: function() {
    /* jshint ignore:start */
    var notifications = this.state.notifications.reverse().map(function(notification) {
      return <Notification uid={notification.uid} title={notification.title} message={notification.message} />;
    });

    return (
      <ol className='notifications'>
        <ReactCSSTransitionGroup transitionName='notification'>
          {notifications}
        </ReactCSSTransitionGroup>
      </ol>
    );
    /* jshint ignore:end */
  }

});