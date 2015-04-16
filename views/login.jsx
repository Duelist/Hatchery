/** @jsx React.DOM */

var React = require('react');

var Login = React.createClass({
  render: function() {
    return (
      <form action='/login' method='post'>
        <input name='username' type='text' value=''></input>
        <input name='password' type='password' value=''></input>
        <input type='submit' value='Login'></input>
      </form>
    );
  }
});

module.exports = Login;
