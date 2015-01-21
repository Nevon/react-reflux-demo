var React = require('react/addons');
var NotificationsStore = require('../stores/notificationsStore');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

module.exports = Message = React.createClass({

  getInitialState: function(){
    return {
      notifications: []
    }
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

  render: function() {
    var notifications = this.state.notifications.reverse().map(function(notification) {
      return (
        <li key={notification.uid}>
          <h2 className='title'>{notification.title}</h2>
          <p className='message'>{notification.message}</p>
        </li>
      );
    });

    return (
      <ol className='notifications'>
        <ReactCSSTransitionGroup transitionName='notification'>
          {notifications}
        </ReactCSSTransitionGroup>
      </ol>
    );
  }

});