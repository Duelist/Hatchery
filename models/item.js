"use strict";
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("item", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Item.belongsTo(models.Character);
      }
    }
  });
  return Item;
};
