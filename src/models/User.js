import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
    }, {
      sequelize
    });

    // this.addHook('beforeSave', async user => {
    //   if (user.password) {
    //     user.password = await bcrypt.hash(user.password, 8);
    //   }
    // });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Project, { foreignKey: 'user_id'});
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

export default User;

// const Sequelize = require('sequelize');
// const database = require('./src/db');
//
// const User = database.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// })
//
// module.exports = User;
