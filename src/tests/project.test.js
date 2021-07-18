const request = require('supertest')
const app = require('../app')
const Setup = require('./test-setup')

test('Should list projects', async () => {
  await Setup.start()
  let login = await Setup.doLogin()
  await request(app).get('/api/projects').set('Authorization', login.body.token).send({}).expect(200)
})

test('Should create a project', async () => {
  await Setup.start()
  let login = await Setup.doLogin()
  await request(app).post('/api/projects').set('Authorization', login.body.token).send({
    title: "New Project Test",
    description: "A new project test",
    budget: "Nugget",
    tags: [
      {
        name: "Tag One"
      },
      {
        name: "Tag Two"
      }
    ]
  }).expect(200)
})

test('Error project exists', async () => {
  await Setup.start()
  let login = await Setup.doLogin()
  await request(app).post('/api/projects').set('Authorization', login.body.token).send({
    title: "Project duplicated",
    description: "A project duplicated",
    budget: "Budget",
    tags: [
      {
        name: "Tag"
      }
    ]
  }).expect(200)

  await request(app).post('/api/projects').set('Authorization', login.body.token).send({
    title: "Project duplicated",
    description: "A project duplicated",
    budget: "Budget",
    tags: [
      {
        name: "Tag"
      }
    ]
  }).expect(422)
})

test('Create project validation error', async () => {
  await Setup.start()
  let login = await Setup.doLogin()
  await request(app).post('/api/projects').set('Authorization', login.body.token).send({
    title: "",
    description: "",
    budget: "",
    tags: []
  }).expect(422)
})
