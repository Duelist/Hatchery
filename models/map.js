"use strict";
module.exports = function(sequelize, DataTypes) {
  var Map_ = sequelize.define("Map", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Map_.belongsTo(models.Campaign);
      }
    }
  });
  return Map_;
};
