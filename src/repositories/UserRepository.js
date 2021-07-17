const User = require('../models/User')
const { getNewDatabaseInstance } = require('../utils/DatabaseUtil')
const jwt = require("jsonwebtoken");

class UserRepository {
  async index (req, res) {
    const { page = 1 } = req.query;
    const users = await User.findAll({
        order: ['name'],
        attributes: getAttributes(),
        limit: 20,
        offset: (page - 1) * 20
      });
    return res.json(users);
  }

  async store(req, res) {
    let Database = getNewDatabaseInstance();
    return await Database.transaction(async (t) => {
      const {
        id,
        name,
        email,
        password,
      } = req.body;

      return await User.create({
        id,
        name,
        email,
        password,
      }, {transaction: t});

    }).then(function (result) {
      return res.status(200).send({message: result.name + " successfully registered!"});
    }).catch(function (err) {
      return res.status(402).send({error: err});
    });
  }

  async login(req, res) {
    let { email, password } = req.body;

    let where = {where: {email}};

    const user = await User.findOne(where);

    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ errors: ['Invalid username or password!'] });
    }

    const { id, name } = user;

    global.auth_user_id = id;

    return res.json({
      user: {
        name,
        email
      },
      token: jwt.sign({ id }, process.env.JWTPRIVATEKEY, {
        expiresIn: '7d'
      })
    })
  }

  async logout(req, res) {
    // global.auth_user_id = null;
    return res.json({
      auth: false, token: null
    })
  }
}

function getAttributes() {
  return [
    'id',
    'name',
    'email',
    'createdAt',
    'updatedAt',
    'deletedAt'
  ];
}

module.exports = new UserRepository();
