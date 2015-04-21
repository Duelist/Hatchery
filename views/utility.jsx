/** @jsx React.DOM */

var React = require('react'),
    cx = require('classnames');

var Button = React.createClass({
  render: function() {
    var classes = cx(
          'outer-button',
          this.props.className
        );

    return (
      <a href={this.props.href} className={classes}>
        <div className={'inner-button'}>{this.props.value}</div>
      </a>
    );
  }
});

module.exports = {
  button: Button
};

