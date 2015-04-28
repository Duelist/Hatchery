"use strict";
module.exports = function(sequelize, DataTypes) {
  var CampaignMap = sequelize.define("campaign_map", {
    name: DataTypes.STRING,
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
        CampaignMap.belongsTo(models.campaign);
      }
    }
  });
  return CampaignMap;
};
