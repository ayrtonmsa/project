import Sequelize, { Model } from 'sequelize';

class Project extends Model {
  static init(sequelize) {
    super.init({
      title: Sequelize.STRING,
      description: Sequelize.STRING,
      budget: Sequelize.STRING,
    }, {
      sequelize
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'});
    this.belongsToMany(models.Tag, { through: 'ProjectTag', as: 'tags', foreignKey: "project_id"});
  }
}

export default Project;
