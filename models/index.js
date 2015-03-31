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

Campaign.belongsTo(User, {
  foreignKey: 'user_id',
  allowNull: false
});

Character.belongsTo(Campaign, {
  foreignKey: 'campaign_id',
  allowNull: false
});

Character.belongsTo(User, {
  foreignKey: 'user_id',
  allowNull: false
});

Item.belongsTo(Character, {
  foreignKey: 'character_id',
  allowNull: false
});

Map_.belongsTo(Campaign, {
  foreignKey: 'campaign_id',
  allowNull: false
});

Blog.belongsTo(Campaign, {
  foreignKey: 'campaign_id',
  allowNull: false
});

BlogPost.belongsTo(Blog, {
  foreignKey: 'blog_id',
  allowNull: false
});

BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
  allowNull: false
});


/* Sync */

var seed_user = User.sync({ force: true }).then(function () {
  return User.create({
    username: 'Duelist',
    email: 'ianbenedict@gmail.com'
  });
});

var seed_campaign = Campaign.sync({ force: true }).then(function () {
  return Campaign.create({
    name: 'Test Campaign',
    description: 'This is a test campaign.',
    user_id: seed_user.id
  });
});

var seed_character = Character.sync({ force: true }).then(function () {
  return Character.create({
    name: 'Test Character',
    bio: 'I am a test.',
    campaign_id: seed_campaign.id,
    user_id: seed_user.id
  });
});

Item.sync({ force: true }).then(function () {
  return Item.create({
    name: 'Test Item',
    description: 'I am a test item.',
    character_id: seed_character.id
  });
});

Map_.sync({ force: true }).then(function () {
  return Map_.create({
    name: 'Test Map',
    campaign_id: seed_campaign.id
  });
});

var seed_blog = Blog.sync({ force: true }).then(function () {
  return Blog.create({
    campaign_id: seed_campaign.id
  });
});

BlogPost.sync({ force: true }).then(function () {
  return BlogPost.create({
    title: 'Test Post',
    body: 'This is a test blog post.',
    blog_id: seed_blog.id,
    user_id: seed_user.id
  });
});

