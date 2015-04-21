/** @jsx React.DOM */

var React = require('react'),
    utility = require('./utility'),
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
            <Button href='/login' className={'nav'} value='Log In'></Button>
          </div>
          <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
            <div className={'title'}>Your new campaign manager.</div>
            <div>
              <Button href='/member/new' className={'sub-title'} value='Sign Up'></Button>
            </div>
          </div>
        </body>
      </html>
    );
  }
});

module.exports = Home;

