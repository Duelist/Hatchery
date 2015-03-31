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
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  logging: true
});


/* Models */

var Member = sequelize.define('member', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Email address must be valid.'
      }
    }
  }
});

var Campaign = sequelize.define('campaign', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.STRING
});

var Character = sequelize.define('character', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  bio: Sequelize.STRING
});

var Item = sequelize.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.STRING
});

var Map_ = sequelize.define('map', {
  name: Sequelize.STRING
});

var Blog = sequelize.define('blog');

var BlogPost = sequelize.define('blog_post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


/* Relations */

Campaign.belongsTo(Member);
/*
Character.belongsTo(Campaign);
Character.belongsTo(Member);
Item.belongsTo(Character);
Map_.belongsTo(Campaign);
Blog.belongsTo(Campaign);
BlogPost.belongsTo(Member);
BlogPost.belongsTo(Blog);
*/

/* Sync */

Member.sync({ force: true }).then(function () {
  return Member.create({
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

