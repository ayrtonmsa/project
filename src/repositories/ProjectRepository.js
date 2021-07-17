const Project = require('../models/Project')
const Tag = require('../models/Tag')
const User = require('../models/User')

const { getNewDatabaseInstance } = require('../utils/DatabaseUtil')

class ProjectRepository {
  async index (req, res) {
    const { page = 1 } = req.query;
    const projects = await Project.scope({method: 'auth'})
      .findAll({
        order: ['title'],
        attributes: getAttributes(),
        limit: 20,
        offset: (page - 1) * 20,
        include: getIncludes()
      });
    return res.json(projects);
  }

  async store(req, res) {
    let Database = getNewDatabaseInstance();
    return await Database.transaction(async (t) => {
      const {
        id,
        title,
        description,
        budget,
        tags
      } = req.body;

      const project = await Project.create({
        id,
        title,
        description,
        budget,
        userId: auth_user_id,
      }, {transaction: t});

      for (const tag of tags) {
        let { id } = project;
        let { name } = tag;

        let tagToProject = await Tag.findOrCreate({
          where: { name: name }
        });

        await project.addTag(tagToProject, {
          transaction: t
        });
      }

      return project
    }).then(function (result) {
      return res.status(200).send({message: result.title + " successfully registered!"});
    }).catch(function (err) {
      return res.status(402).send({error: err});
    });
  }
}

function getIncludes() {
  return [
    {
      model: Tag,
      as: 'tags',
      attributes: ['id', 'name']
    },
    {
      model: User,
      as: 'user',
      attributes: ['id', 'name']
    }
  ]
}

function getAttributes() {
  return [
    'id',
    'title',
    'description',
    'budget',
    'createdAt',
    'updatedAt',
    'deletedAt'
  ];
}

module.exports = new ProjectRepository();