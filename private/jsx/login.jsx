/** @jsx React.DOM */

var React = require('react');

var Login = React.createClass({
  render: function() {
    return (
      <div>
        <div>Login</div>
        <div>{this.props.message}</div>
        <LoginForm {...this.props}></LoginForm>
      </div>
    );
  }
});

var LoginForm = React.createClass({
  render: function() {
    return (
      <form action={this.props.form_action_url} method='post'>
        <input name='username' type='text' value=''></input>
        <input name='password' type='password' value=''></input>
        <input type='submit' value='Login'></input>
      </form>
    );
  }
});

module.exports = Login;
