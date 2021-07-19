const request = require('supertest')
const app = require('../app')

const User = require('../models/User')
const ProjectTag = require('../models/ProjectTag')
const Project = require('../models/Project')
const Tag = require('../models/Tag')

const UserTest = {
  name: "User Test Login",
  email: "usertestlogin@test.tes",
  password: "usertestpassword"
}

class Setup {
  async start() {
    await this.destroyProjects()
    await this.destroyUsers()
    await this.createUserTest()
  }

  getUserTest() {
    return UserTest
  }

  async destroyUsers() {
    await User.destroy({
      where: {},
      truncate: { cascade: true }
    })
  }

  async createUserTest() {
    await request(app).post('/api/users').send({
      name: UserTest.name,
      email: UserTest.email,
      password: UserTest.password
    }).expect(200)
  }

  async destroyProjects() {
    await ProjectTag.destroy({
      where: {},
      truncate: { cascade: true }
    })
    await Project.destroy({
      where: {},
      truncate: { cascade: true }
    })
    await Tag.destroy({
      where: {},
      truncate: { cascade: true }
    })
  }

  async doLogin() {
    return await request(app).post('/api/login').send({
      email: UserTest.email,
      password: UserTest.password
    }).expect(200)
  }
}

module.exports = new Setup()
