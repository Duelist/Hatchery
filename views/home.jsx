/** @jsx React.DOM */

var React = require('react');

var Home = React.createClass({
  render: function() {
    return (
      <html style={{height: '100%'}}>
        <head></head>
        <body style={{
          backgroundColor: '#A5DE37',
          fontFamily: 'Helvetica Neue',
          color: '#FFFFFF',
          width: '100%',
          height: '100%',
          display: 'table'
        }}>
          <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
            <div style={{textAlign: 'center', fontSize: '48px', paddingBottom: '40px'}}>Your new campaign manager.</div>
            <div>
              <a href='/member/new' style={{
                fontSize: '30px',
                width: '150px',
                height: '60px',
                display: 'table',
                border: '2px solid #ffffff',
                borderRadius: '8px',
                marginLeft: 'auto',
                marginRight: 'auto',
                color: '#ffffff',
                textDecoration: 'none',
                textAlign: 'center'
              }}>
                <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
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

