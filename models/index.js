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
Character.belongsTo(Campaign);
Character.belongsTo(Member);
Item.belongsTo(Character);
Map_.belongsTo(Campaign);
Blog.belongsTo(Campaign);
BlogPost.belongsTo(Member);
BlogPost.belongsTo(Blog);


/* Sync */

sequelize.sync({ force: true });


/* Seed data */

Member.create({
  username: 'Duelist',
  email: 'ianbenedict@gmail.com'
}, function (member) {
  Campaign.create({
    name: 'Test Campaign',
    description: 'This is a test campaign.',
    member_id: member.id
  }, function (campaign) {
    Character.create({
      name: 'Test Character',
      bio: 'I am a test.',
      campaign_id: campaign.id,
      member_id: member.id
    }, function (character) {
      Item.create({
        name: 'Test Item',
        description: 'This is a test item.',
        character_id: character.id
      });
    });
    Map_.create({
      name: 'Test Map',
      campaign_id: campaign.id
    });
    Blog.create({
      campaign_id: campaign.id
    }, function (blog) {
      BlogPost.create({
        title: 'Test Post',
        body: 'This is a test blog post.',
        blog_id: blog.id
      });
    });
  });
});

/*
var seed_member = Member.create({
  username: 'Duelist',
  email: 'ianbenedict@gmail.com'
});

var seed_campaign = Campaign.create({
  name: 'Test Campaign',
  description: 'This is a test campaign.',
  member_id: seed_member.id
});

var seed_character = Character.create({
  name: 'Test Character',
  bio: 'I am a test.',
  campaign_id: seed_campaign.id,
  member_id: seed_member.id
});

Item.create({
  name: 'Test Item',
  description: 'I am a test item.',
  character_id: seed_character.id
});

Map_.create({
  name: 'Test Map',
  campaign_id: seed_campaign.id
});

var seed_blog = Blog.create();

BlogPost.create({
  title: 'Test Post',
  body: 'This is a test blog post.',
  blog_id: seed_blog.id
});
*/

