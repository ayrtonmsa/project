const request = require('supertest')
const app = require('../app')
const Setup = require('./test-setup')

test('Should list users', async () => {
  await Setup.start()
  let login = await Setup.doLogin()
  await request(app).get('/api/users').set('Authorization', login.body.token).send({}).expect(200)
})

test('Should list users Unauthorization', async () => {
  await Setup.start()
  await Setup.doLogin()
  await request(app).get('/api/users').set('Authorization', 'token error').send({}).expect(400)
})

test('Should create a user', async () => {
  await Setup.start()
  await request(app).post('/api/users').send({
    name: "Should create a user",
    email: "otherusertest@test.tes",
    password: "otherusertest"
  }).expect(200)
})

test('Error user exists', async () => {
  await Setup.start()
  await request(app).post('/api/users').send({
    name: "Error user exists",
    email: "usertesttoexist@test.tes",
    password: "usertesttoexist"
  }).expect(200)

  await request(app).post('/api/users').send({
    name: "Error user exists",
    email: "usertesttoexist@test.tes",
    password: "usertesttoexist"
  }).expect(422)
})

test('Create user validation error', async () => {
  await Setup.start()
  await request(app).post('/api/users').send({
    name: "",
    email: "",
    password: ""
  }).expect(422)
})
