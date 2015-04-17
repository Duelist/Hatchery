/** @jsx React.DOM */

var React = require('react');

var Home = React.createClass({
  render: function() {
    return (
      <html>
        <head></head>
        <body style={{backgroundColor: '#A5DE37', color: '#FFFFFF'}}>
          <div>
            <div><a href='/login'>Log In</a></div>
            <div><a href='/member/new'>Sign Up</a></div>
          </div>
        </body>
      </html>
    );
  }
});

module.exports = Home;

