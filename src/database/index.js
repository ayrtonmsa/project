const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Project = require('../models/Project');
const Tag = require('../models/Tag');
const ProjectTag = require('../models/ProjectTag');

const connection = new Sequelize(dbConfig);

User.init(connection);
Project.init(connection);
Tag.init(connection);
ProjectTag.init(connection);

User.associate(connection.models);
Project.associate(connection.models);
Tag.associate(connection.models);
ProjectTag.associate(connection.models);

module.exports = connection;
