const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
  await User.deleteMany({});
  await User.insertMany([]);
  await helper.addLoginUser();
});

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs');
  assert.strictEqual(response.status, 200);
  assert.match(response.headers['content-type'], /application\/json/);
});

test('correct number of blogs is returned', async () => {
  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');
  response.body.forEach(blog => {
    assert.ok(blog.id);
    assert.strictEqual(blog._id, undefined);
  });
});

test('valid blog can be created', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const loggedUser = await api.post('/api/login').send(helper.loginUser);
  const response = await api.post('/api/blogs').set('Authorization', `Bearer ${loggedUser.body.token}`).send(helper.newBlog);
  const newBlog = response.body;
  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(newBlog.title, helper.newBlog.title);
  assert.strictEqual(newBlog.author, helper.newBlog.author);
  assert.strictEqual(newBlog.url, helper.newBlog.url);
  assert.strictEqual(newBlog.user.username, loggedUser.body.username);
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);
});

test('valid blog can be created without likes', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const loggedUser = await api.post('/api/login').send(helper.loginUser);
  const response = await api.post('/api/blogs').set('Authorization', `Bearer ${loggedUser.body.token}`).send(helper.newBlogWithoutLikes);
  const newBlog = response.body;
  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(newBlog.likes, 0);
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);
});

test('valid blog cannot be created without title', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const loggedUser = await api.post('/api/login').send(helper.loginUser);
  const response = await api.post('/api/blogs/').set('Authorization', `Bearer ${loggedUser.body.token}`).send(helper.blogWithoutTitle);
  assert.strictEqual(response.status, 400);
  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
});

test('valid blog cannot be created without url', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const loggedUser = await api.post('/api/login').send(helper.loginUser);
  const response = await api.post('/api/blogs/').set('Authorization', `Bearer ${loggedUser.body.token}`).send(helper.blogWithoutUrl);
  assert.strictEqual(response.status, 400);
  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
});

test('valid blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToBeUpdated = { ...blogsAtStart[0] };
  blogToBeUpdated.likes++;

  const response = await api
    .put(`/api/blogs/${blogToBeUpdated.id}`)
    .send(blogToBeUpdated);

  assert.strictEqual(response.status, 200);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);

  const updatedBlog = blogsAtEnd.find(
    (blog) => blog.id === blogToBeUpdated.id
  );
  assert.deepStrictEqual(updatedBlog, blogToBeUpdated);
});

test('valid blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const loggedUser = await api.post('/api/login').send(helper.loginUser);
  const response = await api.post('/api/blogs').set('Authorization', `Bearer ${loggedUser.body.token}`).send(helper.newBlog);
  const blogsAfterAddition = await helper.blogsInDb();

  const deleteResponse = await api.delete(`/api/blogs/${response.body.id}`).set('Authorization', `Bearer ${loggedUser.body.token}`);
  assert.strictEqual(deleteResponse.status, 204);

  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogsAfterAddition.length, blogsAtStart.length + 1);
  assert.strictEqual(blogsAtEnd.length, blogsAfterAddition.length - 1);
});

after(async () => {
  await mongoose.connection.close();
});
