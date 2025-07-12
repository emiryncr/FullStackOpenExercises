const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

test('all users are returned as json', async () => {
  const response = await api.get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, 0)
})

test('user with short username is not created', async () => {
  const newUser = { username: 'ab', password: 'validpass', name: 'Test' }
  const response = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
  assert.ok(response.body.error.includes('username'))
})

test('user with short password is not created', async () => {
  const newUser = { username: 'validuser', password: '12', name: 'Test' }
  const response = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
  assert.ok(response.body.error.includes('password'))
})

test('user with duplicate username is not created', async () => {
  await api.post('/api/users').send({ username: 'unique', password: 'pass123', name: 'Test' })
  const response = await api.post('/api/users').send({ username: 'unique', password: 'pass456', name: 'Test2' }).expect(400)
  assert.ok(response.body.error.includes('unique'))
})

after(async () => {
    await mongoose.connection.close();
})