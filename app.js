'use strict';

var hapi = require('hapi'),
    cookie_auth = require('hapi-auth-cookie'),
    redis = require('redis'),
    slug = require('slug'),
    react_engine = require('hapi-react')(),
    models = require('./models'),
    conf = require('./conf'),
    server = new hapi.Server(),
    redis_client = redis.createClient(
      conf.get('redis_port'),
      conf.get('redis_host')
    );

server.connection({
  host: conf.get('host'),
  port: conf.get('port')
});

server.views({
  defaultExtension: 'jsx',
  engines: {
    jsx: react_engine,
    js: react_engine
  },
  path: __dirname + '/views'
});


/* Server start */

server.register(cookie_auth, function (err) {
  server.auth.strategy('session', 'cookie', {
    password: 'secret',
    cookie: 'scotchery-sid',
    redirectTo: '/login',
    isSecure: false 
  });

  server.route(require('./routes'));

  models.sequelize.sync({ force: true }).then(function () {
    /* Seed data */

    models.member.create({
      username: 'Duelist',
      password: '$2a$10$p9yFI0kQNAT3GyTb4PPlku6Oko0n2n8rFbb2LTx16Syn54KyX4ofi',
      email: 'ianbenedict@gmail.com'
    }).then(function (member) {
      models.campaign.create({
        name: 'Test Campaign',
        description: 'This is a test campaign.',
        slug: slug('Test Campaign').toLowerCase(),
        member_id: member.id
      }).then(function (campaign) {

        redis_client.flushall(function (err, res) {
          redis_client.hmset('campaigns:' + campaign.id, {
              id: campaign.id,
              name: campaign.name,
              slug: campaign.slug
            }, function (err, res) {
              redis_client.sadd('user_campaigns:' + member.id, campaign.id);
            }
          );
        });

        models.character.create({
          name: 'Test Character',
          bio: 'I am a test.',
          slug: slug('Test Character').toLowerCase(),
          campaign_id: campaign.id,
          member_id: member.id
        }).then(function (character) {
          models.item.create({
            name: 'Test Item',
            description: 'This is a test item.',
            slug: slug('Test Item').toLowerCase(),
            campaign_id: campaign.id,
            character_id: character.id
          });
        });
        models.campaign_map.create({
          name: 'Test Map',
          slug: slug('Test Map').toLowerCase(),
          campaign_id: campaign.id
        });
        models.blog.create({
          name: 'Test Campaign Blog',
          campaign_id: campaign.id
        }).then(function (blog) {
          models.blog_post.create({
            title: 'Test Post',
            body: 'This is a test blog post.',
            slug: slug('Test Post').toLowerCase(),
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

