var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  port: 5432,
  logging: false,
  dialectOptions: {
    ssl: true
  }
});

var Campaign = sequelize.define('campaign', {
  name: Sequelize.STRING
});

Campaign.sync({ force: true }).then(function () {
  return Campaign.create({
    name: 'Test Campaign'
  });
});
