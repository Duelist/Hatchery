/** @jsx React.DOM */

var React = require('react'),
    cx = require('classnames');

var Window = React.createClass({
  render: function() {
    var classes = cx(
      'window',
      this.props.className
    );

    return (
      <div className={classes}>
        <div className={'window-title'}>{this.props.title}</div>
        <div className={'window-content'}>{this.props.content}</div>
      </div>
    );
  }
});

module.exports = Window;
