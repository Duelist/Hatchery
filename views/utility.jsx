/** @jsx React.DOM */

var React = require('react');

var Button = React.createClass({
  render: function() {
    return (
      <a href={this.props.href} className={'outer-button'}>
        <div className={'inner-button'}>{this.props.value}</div>
      </a>
    );
  }
});

module.exports = {
  button: Button
};

