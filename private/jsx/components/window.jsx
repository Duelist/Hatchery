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
        {!!this.props.title && <div className={'window-title'}>{this.props.title}</div>}
        <div className={'window-content'}>{this.props.body}</div>
      </div>
    );
  }
});

module.exports = Window;
