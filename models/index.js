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

var User = sequelize.define('User', {
  name: Sequelize.STRING
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

var Blog = sequelize.define('blog', {
  name: Sequelize.STRING
});

var BlogPost = sequelize.define('blog_post', {
  name: Sequelize.STRING,
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
