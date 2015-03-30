var hapi = require('hapi');

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
    handler: home
  }
];

// Routes

function home(request, response) {
  response.view('index');
}

server.route(routes);
server.start(); 
