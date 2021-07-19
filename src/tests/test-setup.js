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
    await this.destroyUsers()
    await this.destroyProjects()
    await this.createUserTest()
  }

  getUserTest() {
    return UserTest
  }

  async destroyUsers() {
    await User.destroy({where: {}})
  }

  async createUserTest() {
    const user = await User.findOne({
      where: { email: "usertestlogin@test.tes" }
    });
    if ( ! user) {
      await request(app).post('/api/users').send({
        name: "User Test Login",
        email: "usertestlogin@test.tes",
        password: "usertestpassword"
      })
    }
  }

  async destroyProjects() {
    await ProjectTag.destroy({where: {}})
    await Project.destroy({where: {}})
    await Tag.destroy({where: {}})
  }

  async doLogin() {
    await this.createUserTest()
    return await request(app).post('/api/login').send({
      email: "usertestlogin@test.tes",
      password: "usertestpassword"
    })
  }
}

module.exports = new Setup()
