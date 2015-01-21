var React = require('react/addons');
var MessageStore = require('../stores/messageStore');

module.exports = Message = React.createClass({

  getInitialState: function(){
    return {
      title: '',
      message: ''
    }
  },

  componentDidMount: function() {
    this.unsubscribe = MessageStore.listen(this.onStatusChange);
  },

  componentWillUnmount: function(){
    this.unsubscribe();
  },

  onStatusChange: function(state){
    console.log("message.jsx::onStatusChange");
    this.setState(state);
  },

  render: function() {
    var classes = React.addons.classSet({
      'notification': true,
      'active' : this.state.message.length !== 0
    });

    return (
      <div className={classes}>
        <h2 className='title'>{this.state.title}</h2>
        <p className='message'>{this.state.message}</p>
      </div>
    );
  }

});