import Sequelize, { Model } from 'sequelize';

class Tag extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
    }, {
      sequelize
    });

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Tag, { through: 'ProjectTag', as: 'tags', foreignKey: "project_id"});
  }
}

export default Tag;
