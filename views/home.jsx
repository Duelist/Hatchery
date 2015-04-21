/** @jsx React.DOM */

var React = require('react'),
    utility = require('utility'),
    Button = utility.button;


var Home = React.createClass({
  render: function() {
    return (
      <html style={{height: '100%'}}>
        <head>
          <link rel='stylesheet' type='text/css' href='/static/css/home.css'></link>
        </head>
        <body>
          <div style={{display: 'table-header-group'}}>
            <Button href='/login' className={'nav'}>Log In</Button>
          </div>
          <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
            <div className={'title'}>Your new campaign manager.</div>
            <div>
              <a href='/member/new' className={'outer-button sub-title'}>
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

