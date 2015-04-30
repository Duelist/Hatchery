/** @jsx React.DOM */

var React = require('react'),
    io = require('socket.io-client'),
    cx = require('classnames'),
    Window = require('./window');

var CampaignPlayers = React.createClass({
  getInitialState: function() {
    return {
      campaign_id: 1,
      players: null
    };
  },
  componentDidMount: function() {
    var that = this;
    this.socket = io('http://localhost:3000/');

    this.socket.on('campaign-players', function (players) {
      that.setState({
        campaign_id: that.state.campaign_id,
        players: players
      });
    });

    this.socket.emit('get-campaign-players', {
      campaign_id: this.state.campaign_id
    });
  },
  render: function() {
    var classes = cx(
      'campaign-players',
      this.props.className
    );

    var players = (<div>Loading campaign players...</div>);
    if (this.state.players) {
      players = this.state.players.map(function (player) {
        return (<div key={player.id}>{player.username}</div>);
      });
    }

    return (
      <div className={classes}>
        <Window body={players}></Window>
      </div>
    );
  }
});

module.exports = CampaignPlayers;

