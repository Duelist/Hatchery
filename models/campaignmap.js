"use strict";
module.exports = function(sequelize, DataTypes) {
  var CampaignMap = sequelize.define("campaign_map", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // CampaignMap.belongsTo(models.Campaign);
      }
    }
  });
  return CampaignMap;
};
