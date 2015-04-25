/** @jsx React.DOM */

var React = require('react'),
    Blog = require('./components/blog');

var Dashboard = React.createClass({
  render: function() {
    return (
      <Blog></Blog>
    );
  }
});

// module.exports = Dashboard;
React.render(
  <Dashboard></Dashboard>,
  document.getElementById('content')
);
