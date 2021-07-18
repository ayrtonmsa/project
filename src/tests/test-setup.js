const request = require('supertest')
const app = require('../app')

const User = require('../models/User')
const ProjectTag = require('../models/ProjectTag')
const Project = require('../models/Project')
const Tag = require('../models/Tag')

const UserTest = {
  name: "User Test Login",
  email: "usertestlogin@test.tes",
  password: "usertest"
}

class Setup {
  async start() {
    await this.destroyUsers()
    await this.createUserTest()
    await this.destroyProjects()
  }

  getUserTest() {
    return UserTest
  }

  async destroyUsers() {
    await User.destroy({where: {}})
  }

  async createUserTest() {
    await request(app).post('/api/users').send({
      name: UserTest.name,
      email: UserTest.email,
      password: UserTest.password
    }).expect(200)
  }

  async destroyProjects() {
    await ProjectTag.destroy({where: {}})
    await Project.destroy({where: {}})
    await Tag.destroy({where: {}})
  }

  async doLogin() {
    return await request(app).post('/api/login').send({
      email: UserTest.email,
      password: UserTest.password
    }).expect(200)
  }
}

module.exports = new Setup()
