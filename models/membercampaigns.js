"use strict";
module.exports = function(sequelize, DataTypes) {
  var MemberCampaigns = sequelize.define("member_campaigns", {
    is_dm: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MemberCampaigns;
};
