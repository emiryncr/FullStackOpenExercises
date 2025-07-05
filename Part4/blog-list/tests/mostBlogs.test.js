const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('mostBlogs', () => {
  const blogs = [
    {
      _id: '1',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'http://www.example.com/1',
      likes: 5
    },
    {
      _id: '2',
      title: 'Blog 2',
      author: 'Author 2',
      url: 'http://www.example.com/2',
      likes: 7
    },
    {
      _id: '3',
      title: 'Blog 3',
      author: 'Author 1',
      url: 'http://www.example.com/3',
      likes: 10
    }
  ]

  test('of a list with multiple blogs returns the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: 'Author 1',
      blogs: 2
    })
  })
})