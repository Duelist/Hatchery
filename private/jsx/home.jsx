/** @jsx React.DOM */

var React = require('react'),
    Button = require('./components/button');

var Home = React.createClass({
  render: function() {
    return (
      <div>
        <div style={{display: 'table-header-group'}}>
          <Button href='/login' className={'nav'} value='Log In'></Button>
        </div>
        <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
          <div className={'title'}>Your new campaign manager.</div>
          <div>
            <Button href='/member/new' className={'sub-title'} value='Sign Up'></Button>
          </div>
        </div>
      </div>
    );
  }
});

React.render(
  <Home></Home>,
  document.getElementById('content')
);
