/** @jsx React.DOM */

var React = require('react');

var Home = React.createClass({
  render: function() {
    return (
      <html style={{height: '100%'}}>
        <head></head>
        <body>
          <div style={{display: 'table-header-group'}}>
            <a href='/login' class='outer-button'>
              <div class='inner-button'>Log In</div>
            </a>
          </div>
          <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
            <div class='title'>Your new campaign manager.</div>
            <div>
              <a href='/member/new' class='outer-button'>
                <div class='inner-button'>
                  Sign Up
                </div>
              </a>
            </div>
          </div>
        </body>
      </html>
    );
  }
});

module.exports = Home;

