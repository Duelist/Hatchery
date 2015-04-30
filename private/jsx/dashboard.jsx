/** @jsx React.DOM */

var React = require('react'),
    Blog = require('./components/blog'),
    CampaignPlayers = require('./components/campaign_players');

var Dashboard = React.createClass({
  render: function() {
    return (
      <div style={{ padding: '45px', display: 'flex', flexDirection: 'row' }}>
        <Blog></Blog>
        <CampaignPlayers></CampaignPlayers>
      </div>
    );
  }
});

React.render(
  <Dashboard></Dashboard>,
  document.getElementById('content')
);
