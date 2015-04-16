/** @jsx React.DOM */

var React = require('react');

var Campaign = React.createClass({
  render: function() {
    return (
      <div>
        <div>New Campaign</div>
        <div>{this.props.message}</div>
        <CampaignForm {...this.props}></CampaignForm>
      </div>
    );
  }
});

var CampaignForm = React.createClass({
  render: function () {
    return (
      <form action={this.props.form_action_url} method='post'>
        <input name='name' type='text' value=''></input>
        <textarea name='description' value=''></textarea>
        <input type='submit' value='Sign Up'></input>
      </form>
    );
  }
});

module.exports = Campaign;
