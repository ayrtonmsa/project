const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      sequelize
    })
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    });
  }

  static associate(models) {
    this.hasMany(models.Project, { foreignKey: 'userId', as: 'projects' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

module.exports = User;
