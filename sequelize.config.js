const path = require('path');

module.exports = {
  development: {
    username: 'user',
    password: 'password',
    database: 'streets_db',
    host: 'postgres',
    dialect: 'postgres',
    migrationStorage: 'sequelize',
    migrationStorageTableName: 'migrations',
  },
};
