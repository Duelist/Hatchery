var hapi = require('hapi');

var server = new hapi.Server();

server.connection({
  host: '0.0.0.0',
  port: +process.env.PORT || 3000
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello.');
  }
});
 
server.start(); 
