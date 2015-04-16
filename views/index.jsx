/** @jsx React.DOM */

var React = require('react');

var Index = React.createClass({
  render: function() {
    if (this.props.member) {
      return (
        <div>
          <div>Welcome, {this.props.member.username}.</div>
          <CampaignList></CampaignList>
        </div>
      );
    }

    return (
      <div>
        <div><a href='/login'>Log In</a></div>
        <div><a href='/login'>Sign Up</a></div>
      </div>
    );
  }
});

var CampaignList = React.createClass({
  render: function () {
    return (
      <ul>
        {this.props.member.campaigns.map(function (campaign) {
          var campaign_link = '/campaigns/' + campaign.slug;
          return <li><a href={campaign_link}>{campaign.name}</a></li>
        })}
      </ul>
    );
  }
});

module.exports = Index;