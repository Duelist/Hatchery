/** @jsx React.DOM */

var React = require('react');

var Character = React.createClass({
  render: function() {
    return (
      <div>
        <div>New Character</div>
        <div>{this.props.message}</div>
        <CharacterForm {...this.props}></CharacterForm>
      </div>
    );
  }
});

var CharacterForm = React.createClass({
  render: function () {
    return (
      <form action={this.props.form_action_url} method='post'>
        <input name='name' type='text' value=''></input>
        <textarea name='bio' value=''></textarea>
        <input type='submit' value='Create Character'></input>
      </form>
    );
  }
});

module.exports = Character;
