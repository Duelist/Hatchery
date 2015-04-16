/** @jsx React.DOM */

var React = require('react');

var Campaign = React.createClass({
  render: function() {
    return (
      <div>New Campaign</div>
      <div>{this.props.message}</div>
      <form action={this.props.form_action_url} method='post'>
        <input name='name' type='text' value=''></input>
        <input name='description' type='textarea' value=''></input>
        <input type='submit' value='Create Campaign'></input>
      </form>
    );
  }
});

module.exports = Campaign;
