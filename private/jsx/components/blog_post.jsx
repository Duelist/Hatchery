/** @jsx React.DOM */

var React = require('react'),
    cx = require('classnames'),
    Window = require('./window');

var BlogPost = React.createClass({
  render: function() {
    var classes = cx(
      'blog-post',
      this.props.className
    );

    return (
      <Window title={this.props.title} body={this.props.body}></Window>
    );
  }
});

module.exports = BlogPost;
