const assert = require('assert')
const test = require('node:test')
const listHelper = require('../utils/list_helper')

const emptyBlogList = []

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const listWithManyBlogs = [
    {
        id: '1',
        title: 'JavaScript Best Practices',
        author: 'Ada Lovelace',
        url: 'https://jsbestpractices.com/',
        likes: 8,
        __v: 0
    },
    {
        id: '2',
        title: 'Functional Programming in JS',
        author: 'Grace Hopper',
        url: 'https://functionaljs.com/',
        likes: 6,
        __v: 0
    },
    {
        id: '3',
        title: 'Async Patterns',
        author: 'Ada Lovelace',
        url: 'https://asyncpatterns.com/',
        likes: 13,
        __v: 0
    },
    {
        id: '4',
        title: 'Testing Strategies',
        author: 'Linus Torvalds',
        url: 'https://testingstrategies.com/',
        likes: 11,
        __v: 0
    },
    {
        id: '5',
        title: 'Clean Code Principles',
        author: 'Linus Torvalds',
        url: 'https://cleancode.com/',
        likes: 1,
        __v: 0
    },
    {
        id: '6',
        title: 'TypeScript vs JavaScript',
        author: 'Linus Torvalds',
        url: 'https://typescriptvsjs.com/',
        likes: 3,
        __v: 0
    }
]

test('dummy returns one', () => {
    const result = listHelper.dummy(emptyBlogList)
    assert.strictEqual(result, 1)
})

test('total likes of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyBlogList)
    assert.strictEqual(result, 0)
})

test('total likes when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
})

test('total likes of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 42)
})

test('favourite blog of empty list is null', () => {
    const result = listHelper.favoriteBlog(emptyBlogList)
    assert.strictEqual(result, null)
})

test('favourite blog of a list with only one blog equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5,
    })
})

test('favourite blog of a bigger list is correct', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    assert.deepStrictEqual(result, {
        title: 'Async Patterns',
        author: 'Ada Lovelace',
        likes: 13
    })
})

test('most blogs of empty list is null', () => {
    const result = listHelper.mostBlogs(emptyBlogList)
    assert.strictEqual(result, null)
})

test('most blogs of a list with only one blog equals author of that blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, {
        author: 'Edsger W. Dijkstra',
        blogs: 1,
    })
})

test('most blogs of a bigger list is correct', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    assert.deepStrictEqual(result, {
        author: 'Linus Torvalds',
        blogs: 3
    })
})

test('most likes of empty list is null', () => {
    const result = listHelper.mostLikes(emptyBlogList)
    assert.strictEqual(result, null)
})

test('most likes of a list with only one blog equals author of that blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, {
        author: 'Edsger W. Dijkstra',
        likes: 5,
    })
})

test('most likes of a bigger list is correct', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    assert.deepStrictEqual(result, {
        author: 'Ada Lovelace',
        likes: 21
    })
})