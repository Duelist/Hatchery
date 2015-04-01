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
  server.start();
});

