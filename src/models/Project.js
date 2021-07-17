const { Model, DataTypes } = require('sequelize');
const { authScope } = require('../scopes/AuthScope');

class Project extends Model {
  static init(sequelize) {
    super.init({
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      budget: DataTypes.STRING
    }, {
      scopes: {
        auth() {
          return authScope(auth_user_id)
        }
      },
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user'});
    this.belongsToMany(models.Tag, { through: 'ProjectTag', as: 'tags', foreignKey: "projectId"});
    this.hasMany(models.ProjectTag, { foreignKey: 'projectId'});
  }
}

module.exports = Project;
