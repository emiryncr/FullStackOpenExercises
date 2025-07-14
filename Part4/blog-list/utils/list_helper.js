const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const fav = blogs.reduce((favorite, blog) => {
    return favorite.likes < blog.likes ? blog : favorite
  }, blogs[0])
  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes
  }
}

const _ = require('lodash')

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const grouped = _.countBy(blogs, 'author')
  const author = _.maxBy(Object.keys(grouped), a => grouped[a])
  return { author, blogs: grouped[author] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const grouped = _.groupBy(blogs, 'author')
  const author = _.maxBy(Object.keys(grouped), a => _.sumBy(grouped[a], 'likes'))
  return { author, likes: _.sumBy(grouped[author], 'likes') }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}