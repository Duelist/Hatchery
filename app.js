'use strict';

var hapi = require('hapi'),
    cookie_auth = require('hapi-auth-cookie'),
    redis = require('redis'),
    slug = require('slug'),
    handlebars = require('handlebars'),
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
  defaultExtension: 'html',
  engines: {
    html: handlebars
  },
  path: __dirname + '/views'
});


var io = require('socket.io')(server.listener);

io.on('connection', function (socket) {
  socket.on('get-blog-posts', function (data) {
    models.blog_post.findAll({
      where: {
        blog_id: data.blog_id
      },
      order: 'created_at DESC'
    }).then(function (blog_posts) {
      io.emit('blog-posts', blog_posts);
    });
  });

  socket.on('get-campaign-players', function (data) {
    models.campaign.findOne({
      where: {
        id: data.campaign_id
      }
    }).then(function (campaign) {
      campaign.getPlayers().then(function (players) {
        io.emit('campaign-players', players);
      });
    });
  });
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
        owner_id: member.id
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

        models.member_campaigns.create({
          campaign_id: campaign.id,
          member_id: member.id,
          is_dm: true
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
            body: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at felis quam. Vivamus quis dui a dui facilisis blandit eget et nunc. Donec posuere, augue vel tempor cursus, orci mi placerat lorem, non tempor ante lacus id diam. Praesent ac neque eu lectus congue scelerisque. Integer eros odio, feugiat a metus eget, tincidunt semper diam. Donec quis hendrerit nisl. Sed ac ipsum mi. Ut dapibus, turpis vel maximus euismod, purus quam auctor enim, vitae sagittis ante urna in diam. Maecenas gravida metus nulla, eget hendrerit dolor rutrum at.',
              'Proin imperdiet, lectus vitae commodo iaculis, enim leo vestibulum lacus, ut lacinia nulla libero eu felis. Maecenas eleifend dui non libero efficitur, at condimentum mi rhoncus. Nunc tincidunt arcu nisl, ut ullamcorper justo consectetur sit amet. Aliquam erat volutpat. Donec non quam enim. Curabitur ornare fringilla dui eu vestibulum. Maecenas quis semper elit.',
              'Aenean pulvinar ante a nibh condimentum tristique. Mauris tempus porta libero, quis tincidunt eros faucibus id. Fusce venenatis, ex sed consectetur laoreet, nibh libero aliquet ipsum, a laoreet augue neque in nisl. Etiam ipsum eros, auctor vitae venenatis eu, efficitur ut nulla. Cras condimentum lacus turpis, vitae pharetra tortor molestie ut. Vivamus in ullamcorper ex, quis porttitor nisl. Maecenas sit amet lorem in massa tempus egestas. Donec ullamcorper pellentesque dolor, non laoreet tortor. Proin viverra mi eu imperdiet ullamcorper. In hac habitasse platea dictumst. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
            ].join('\n'),
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

