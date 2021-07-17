const ProjectRepository = require('../repositories/ProjectRepository')
const ProjectValidation = require('../validations/ProjectValidation')

module.exports = {
  async index(req, res) {
    return await ProjectRepository.index(req, res);
  },

  async store(req, res) {
    const result = await ProjectValidation.store(req, res);

    if (Object.keys(result.errors).length > 0) {
      return res.status(422).json(result);
    }

    return await ProjectRepository.store(req, res);
  }
};
