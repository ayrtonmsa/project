const request = require('supertest')
const app = require('../app')
const Setup = require('./test-setup')

test('Should login', async () => {
  await Setup.start()
  const result = await request(app).post('/api/login').send({
    email: "usertestlogin@test.tes",
    password: "usertestpassword"
  }).expect(200)
  expect(result.body.user).toBeDefined();
  expect(result.body.token).toBeDefined();
})

test('Login validation error', async () => {
  await Setup.start()
  await request(app).post('/api/login').send({
    email: "",
    password: ""
  }).expect(422)
})

test('Login validation error', async () => {
  await Setup.start()
  await request(app).post('/api/login').send({
    email: "emaildontexist@test.tes",
    password: "passworddontexist"
  }).expect(401)
})

test('Should logout', async () => {
  await Setup.start()
  let login = await Setup.doLogin()
  await request(app).get('/api/logout').set('Authorization', login.body.token).send({}).expect(200)
})
