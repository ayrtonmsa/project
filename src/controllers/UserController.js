const UserRepository = require('../repositories/UserRepository')
const UserValidation = require('../validations/UserValidation')

module.exports = {
  async index(req, res) {
    return await UserRepository.index(req, res);
  },

  async store(req, res) {
    const result = await UserValidation.store(req, res);

    if (Object.keys(result.errors).length > 0) {
      return res.status(422).json(result);
    }

    return await UserRepository.store(req, res);
  },

  async login(req, res) {
    const result = await UserValidation.login(req, res);

    if (Object.keys(result.errors).length > 0) {
      return res.status(422).json(result);
    }
    return await UserRepository.login(req, res);
  },

  async logout(req, res) {
    return await UserRepository.logout(req, res);
  }
};
