var nconf = require('nconf');

nconf.argv().env().file({ file: 'local.json' });

nconf.defaults({
  env: process.env.NODE_ENV,
  host: '0.0.0.0',
  port: +process.env.PORT,
  sql_url: process.env.DATABASE_URL,
  sql_dialect: 'postgres',
  sql_protocol: 'postgres',
  sql_port: 5432,
  sql_ssl_enabled: true,
  redis_host: process.env.REDIS_IP,
  redis_port: process.env.REDIS_PORT
});

module.exports = nconf;
