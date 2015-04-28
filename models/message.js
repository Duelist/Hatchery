"use strict";
module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("message", {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unread: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Message.belongsTo(models.member, { as: 'sender' });
        Message.belongsTo(models.member, { as: 'recipient' });
      }
    }
  });
  return Message;
};
