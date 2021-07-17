const { Model, DataTypes } = require('sequelize');

class ProjectTag extends Model {
  static init(sequelize) {
    super.init({}, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project'});
    this.belongsTo(models.Tag, { foreignKey: 'tagId', as: 'tag'});
  }
}

module.exports = ProjectTag;
