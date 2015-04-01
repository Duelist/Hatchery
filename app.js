'use strict';

var bcrypt = require('bcrypt');
var hapi = require('hapi');
var cookie_auth = require('hapi-auth-cookie');
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


/* Routes */

var routes = [
  {
    method: 'GET',
    path: '/',
    handler: home
  },
  {
    method: ['GET', 'POST'],
    path: '/login',
    handler: login,
    config: {
      auth: {
        mode: 'try',
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      }
    }
  }
];

function home(request, response) {
  response.view('index');
}

function login(request, response) {
  var message = '';

  if (request.auth.isAuthenticated) {
    return response.redirect('/');
  }

  if (request.method === 'post') {
    if (!request.payload.username || !request.payload.password) {
      message = 'Missing username or password.';
    } else {
      models.member.findOne({
        where: {
          username: request.payload.username
        }
      }).then(function (member) {
        if (member) {
          bcrypt.compare(request.payload.password, member.password, function (err, is_valid) {
            request.auth.session.set(member);
            return response.redirect('/');
          })
        } else {
          message = 'Invalid username or password.';
        }
      });
    }
  }

  response.view('login');
}

function logout(request, response) {
  request.auth.session.clear();
  return response.redirect('/');
}


/* Server start */

server.register(cookie_auth, function (err) {
  /*
  server.auth.strategy('simple', 'basic', {
    validateFunc: function (username, password, callback) {
      models.member.findOne({
        where: {
          username: username
        }
      }).then(function (member) {
        bcrypt.compare(password, member.password, function (err, is_valid) {
          callback(err, is_valid, { member: member });
        });
      });
    }
  });
  */

  server.auth.strategy('session', 'cookie', {
    password: 'secret',
    cookie: 'sid',
    redirectTo: '/login',
    isSecure: false 
  });

  server.route(routes);

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
          member_id: member.id
        }).then(function (campaign) {
          models.character.create({
            name: 'Test Character',
            bio: 'I am a test.',
            campaign_id: campaign.id,
            member_id: member.id
          }).then(function (character) {
            models.item.create({
              name: 'Test Item',
              description: 'This is a test item.',
              character_id: character.id
            });
          });
          models.campaign_map.create({
            name: 'Test Map',
            campaign_id: campaign.id
          });
          models.blog.create({
            name: 'Test Campaign Blog',
            campaign_id: campaign.id
          }).then(function (blog) {
            models.blog_post.create({
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

