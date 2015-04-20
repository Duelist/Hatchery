/** @jsx React.DOM */

var React = require('react');

var Home = React.createClass({
  render: function() {
    return (
      <html style={{height: '100%'}}>
        <head>
          <link rel='stylesheet' type='text/css' href='/static/css/home.css'></link>
        </head>
        <body>
          <div style={{display: 'table-header-group'}}>
            <a href='/login' className={'outer-button'}>
              <div className={'inner-button'}>Log In</div>
            </a>
          </div>
          <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
            <div className={'title'}>Your new campaign manager.</div>
            <div>
              <a href='/member/new' className={'outer-button'}>
                <div className={'inner-button'}>
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

