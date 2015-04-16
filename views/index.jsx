/** @jsx React.DOM */

var React = require('react');

var Index = React.createClass({
  render: function() {
    if (this.props.member) {
      return (
        <div>Welcome, {this.props.member.username}.</div>
      );
    }

    return <a href='/login'>Log In</a>;
  }
});

module.exports = Index;
