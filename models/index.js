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
  name: Sequelize.STRING,
  description: Sequelize.STRING
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

var Character = sequelize.define('character', {
  name: Sequelize.STRING,
  bio: Sequelize.STRING
});

Character.belongsTo(Campaign);

Campaign.sync({ force: true }).then(function () {
  return Campaign.create({
    name: 'Test Campaign',
    description: 'This is a test campaign.'
  });
});

Character.sync({ force: true }).then(function () {
  return Campaign.create({
    name: 'Test Character',
    bio: 'I am a test.'
  });
});
