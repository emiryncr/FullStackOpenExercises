const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

test('retrieving users: all users are returned as json', async () => {
  const response = await api.get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('creating a user: valid user can be created', async () => {
  const usersAtStart = await helper.usersInDb()
  const newUser = {
    username: helper.uniqueUser.username,
    name: helper.uniqueUser.name,
    password: helper.uniqueUser.password
  }
  await api
    .post('/api/users/')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const usersAtEnd = await helper.usersInDb()
  assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  const usernames = usersAtEnd.map(user => user.username)
  assert.ok(usernames.includes(newUser.username))
})

test('creating a user: username should be unique', async () => {
  await api
    .post('/api/users/')
    .send(helper.notUniqueUser)
    .expect(400)
})

test('creating a user: password should be provided', async () => {
  await api
    .post('/api/users/')
    .send(helper.userWithOutPassword)
    .expect(400)
})

test('creating a user: password should be at least 3 characters long', async () => {
  await api
    .post('/api/users/')
    .send(helper.userWithShortPassword)
    .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})
