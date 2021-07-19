const request = require('supertest')
const app = require('../app')
const Setup = require('./test-setup')

beforeEach(async () => {
  await Setup.start()
});

test('Should login', async () => {
  const result = await request(app).post('/api/login').send({
    email: Setup.getUserTest().email,
    password: Setup.getUserTest().password
  }).expect(200)
  expect(result.body.user).toBeDefined();
  expect(result.body.token).toBeDefined();
})

test('Login validation error', async () => {
  await request(app).post('/api/login').send({
    email: "",
    password: ""
  }).expect(422)
})

test('Login validation error min/email', async () => {
  await request(app).post('/api/login').send({
    email: "min/email",
    password: "123"
  }).expect(422)
})

test('Login validation error', async () => {
  await request(app).post('/api/login').send({
    email: Setup.getUserTest().email,
    password: "passworddontexist"
  }).expect(401)
})

test('Should logout', async () => {
  let login = await Setup.doLogin()

  await request(app).get('/api/logout').set('Authorization', login.body.token).send({}).expect(200)
})
