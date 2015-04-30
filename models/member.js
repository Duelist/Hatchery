"use strict";
module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define("member", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Email address must be valid.'
        }
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Member.belongsToMany(models.campaign, { through: models.member_campaigns });
        Member.hasMany(models.message, { as: 'messages_sent' });
        Member.hasMany(models.message, { as: 'messages_received' });
      }
    }
  });
  return Member;
};
