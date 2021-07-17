const { Model, DataTypes } = require('sequelize');

class Tag extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsToMany(models.Project, { through: 'ProjectTag', as: 'projects', foreignKey: "tagId"});
    this.hasMany(models.ProjectTag, { foreignKey: 'tagId'});
  }
}

module.exports = Tag;
