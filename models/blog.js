"use strict";
module.exports = function(sequelize, DataTypes) {
  var Blog = sequelize.define("blog", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Blog.belongsTo(models.Campaign);
      }
    }
  });
  return Blog;
};
