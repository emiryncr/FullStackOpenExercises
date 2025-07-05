const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
    const listWithMultipleBlogs = [
        {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.example.com/1',
        likes: 5
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'React Patterns',
        author: 'Michael Chan',
        url: 'http://www.example.com/2',
        likes: 7
      },
      {
        _id: '5a422aa71b54a676234d17fa',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.example.com/1',
        likes: 5
      }
    ]

    //use deepStrictEqual to compare objects
    test('of a list with multiple blogs returns the blog with most likes', () => {
        const result = listHelper.favoriteBlog(listWithMultipleBlogs)
        assert.deepStrictEqual(result, {
            _id: '5a422aa71b54a676234d17f9',
            title: 'React Patterns',
            author: 'Michael Chan',
            url: 'http://www.example.com/2',
            likes: 7
        })
    })
})