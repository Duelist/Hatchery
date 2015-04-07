"use strict";
module.exports = function(sequelize, DataTypes) {
  var Campaign = sequelize.define("campaign", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Campaign.belongsTo(models.member); 
      }
    }
  });
  return Campaign;
};
