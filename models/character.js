"use strict";
module.exports = function(sequelize, DataTypes) {
  var Character = sequelize.define("character", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Character.belongsTo(models.member);
        Character.belongsTo(models.campaign);
      }
    }
  });
  return Character;
};
