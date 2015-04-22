"use strict";

var fs        = require('fs'),
    path      = require('path'),
    Sequelize = require('sequelize'),
    basename  = path.basename(module.filename),
    conf      = require('../conf'),
    env       = conf.get('env'),
    db_url    = conf.get('sql_url'),
    sequelize = new Sequelize(db_url, {
      dialect: conf.get('sql_dialect'),
      protocol: conf.get('sql_protocol'),
      port: conf.get('sql_port'),
      logging: false,
      dialectOptions: {
        ssl: conf.get('sql_ssl_enabled')
      },
      define: {
        freezeTableName: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    });

var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
