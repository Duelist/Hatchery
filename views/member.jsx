/** @jsx React.DOM */

var React = require('react');

var Member = React.createClass({
  render: function() {
    return (
      <div>
        <div>Sign Up</div>
        <div>{this.props.message}</div>
        <MemberForm></MemberForm>
      </div>
    );
  }
});

var MemberForm = React.createClass({
  render: function () {
    return (
      <form action={this.props.form_action_url} method='post'>
        <input name='email' type='text' value=''></input>
        <input name='username' type='text' value=''></input>
        <input name='password' type='password' value=''></input>
        <input type='submit' value='Sign Up'></input>
      </form>
    );
  }
});

module.exports = Member;
