import Sequelize, { Model } from 'sequelize';

class ProjectTag extends Model {
  static init(sequelize) {
    super.init({}, {
      sequelize
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Project, { foreignKey: 'project_id', as: 'project' });
    this.belongsTo(models.Tag, { foreignKey: 'tag_id', as: 'tag' });
  }
}

export default ProjectTag;
