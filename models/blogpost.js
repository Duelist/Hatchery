"use strict";
module.exports = function(sequelize, DataTypes) {
  var BlogPost = sequelize.define("blog_post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        BlogPost.belongsTo(models.Member);
        BlogPost.belongsTo(models.Blog);
      }
    }
  });
  return BlogPost;
};
