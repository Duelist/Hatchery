"use strict";
module.exports = function(sequelize, DataTypes) {
  var Campaign = sequelize.define("campaign", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
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
        var MemberCampaigns = sequelize.define('member_campaigns', {
          is_dm: DataTypes.BOOLEAN
        });

        Campaign.belongsTo(models.member, { as: 'owner' }); 
        Campaign.belongsToMany(models.member, { through: MemberCampaigns }); 
      }
    }
  });
  return Campaign;
};
