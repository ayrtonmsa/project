const Project = require('../models/Project')
const ProjectTag = require('../models/ProjectTag')
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

        let existTag = await Tag.findOne({
          where: { name: name }
        });

        if ( ! existTag) {
          existTag = await Tag.create({
            name
          }, {transaction: t});
        }

        await ProjectTag.create({
          projectId: id,
          tagId: existTag.id
        }, {transaction: t})
      }

      return project
    }).then(function (result) {
      return res.status(200).send({message: result.title + " successfully registered!"});
    }).catch(function (err) {
      return res.status(400).send({error: err});
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
