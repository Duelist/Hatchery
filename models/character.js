"use strict";
module.exports = function(sequelize, DataTypes) {
  var Character = sequelize.define("character", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: DataTypes.STRING,
    slug: DataTypes.STRING,
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
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
