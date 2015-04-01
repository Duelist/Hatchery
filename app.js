'use strict';

var bcrypt = require('bcrypt');
var hapi = require('hapi');
var basic_auth = require('hapi-auth-basic');
var models = require('./models');

var server = new hapi.Server();

server.connection({
  host: '0.0.0.0',
  port: +process.env.PORT || 3000
});

server.views({
  engines: {
    jade: require('jade')
  },
  path: __dirname + '/views'
});

var routes = [
  {
    method: 'GET',
    path: '/',
    handler: home,
    config: {
      auth: 'simple'
    }
  }
];

// Routes

function home(request, response) {
  response.view('index', { user: request.auth.credentials.user });
}

server.register(basic_auth, function (err) {
  server.auth.strategy('simple', 'basic', {
    validateFunc: function (user_id, password, callback) {
      var user = models.Member.findOne({
        where: {
          id: user_id
        }
      });

      bcrypt.compare(password, user.password, function (err, is_valid) {
        callback(err, is_valid, { user: user });
      });
    }
  });
  server.route(routes);

  models.sequelize.sync({ force: true }).then(function () {
      /* Seed data */

      models.Member.create({
        username: 'Duelist',
        password: '$2a$10$p9yFI0kQNAT3GyTb4PPlku6Oko0n2n8rFbb2LTx16Syn54KyX4ofi',
        email: 'ianbenedict@gmail.com'
      }).then(function (member) {
        models.Campaign.create({
          name: 'Test Campaign',
          description: 'This is a test campaign.',
          member_id: member.id
        }).then(function (campaign) {
          models.Character.create({
            name: 'Test Character',
            bio: 'I am a test.',
            campaign_id: campaign.id,
            member_id: member.id
          }).then(function (character) {
            models.Item.create({
              name: 'Test Item',
              description: 'This is a test item.',
              character_id: character.id
            });
          });
          models.Map_.create({
            name: 'Test Map',
            campaign_id: campaign.id
          });
          models.Blog.create({
            campaign_id: campaign.id
          }).then(function (blog) {
            models.BlogPost.create({
              title: 'Test Post',
              body: 'This is a test blog post.',
              blog_id: blog.id,
              member_id: member.id
            });
          });
        });
      }).then(function () {
        server.start();
      });
  });
});

