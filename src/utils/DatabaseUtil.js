const databaseConfig = require('../config/database')
const Sequelize = require('sequelize')

module.exports.getNewDatabaseInstance = () => {
  return new Sequelize(databaseConfig);
}
