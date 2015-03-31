var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  port: 5432,
  logging: false,
  dialectOptions: {
    ssl: true
  },
  define: {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


/* Models */

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  email: Sequelize.STRING
});

var Campaign = sequelize.define('campaign', {
  name: Sequelize.STRING,
  description: Sequelize.STRING
});

var Character = sequelize.define('character', {
  name: Sequelize.STRING,
  bio: Sequelize.STRING
});

var Item = sequelize.define('item', {
  name: Sequelize.STRING,
  description: Sequelize.STRING
});

var Map_ = sequelize.define('map', {
  name: Sequelize.STRING
});

var Blog = sequelize.define('blog');

var BlogPost = sequelize.define('blog_post', {
  title: Sequelize.STRING,
  body: Sequelize.STRING
});


/* Relations */

Map_.belongsTo(Campaign);
Character.belongsTo(Campaign);
Character.belongsTo(User);
Item.belongsTo(Character);
Blog.belongsTo(Campaign);
BlogPost.belongsTo(Blog);
BlogPost.belongsTo(User);


/* Sync */

User.sync({ force: true }).then(function () {
  return User.create({
    username: 'Duelist',
    email: 'ianbenedict@gmail.com'
  });
});

Campaign.sync({ force: true }).then(function () {
  return Campaign.create({
    name: 'Test Campaign',
    description: 'This is a test campaign.'
  });
});

Character.sync({ force: true }).then(function () {
  return Character.create({
    name: 'Test Character',
    bio: 'I am a test.'
  });
});

Item.sync({ force: true }).then(function () {
  return Item.create({
    name: 'Test Item',
    description: 'I am a test item.'
  });
});

Map_.sync({ force: true }).then(function () {
  return Map_.create({
    name: 'Test Map'
  });
});

Blog.sync({ force: true }).then(function () {
  return Blog.create();
});

BlogPost.sync({ force: true }).then(function () {
  return BlogPost.create({
    title: 'Test Post',
    body: 'This is a test blog post.'
  });
});

