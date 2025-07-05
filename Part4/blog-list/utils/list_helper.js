const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((favorite, blog) => {
        return (favorite.likes || 0) < blog.likes ? blog : favorite
    }
, {})
}

const _ = require('lodash')

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}
  const grouped = _.countBy(blogs, 'author')
  const author = _.maxBy(Object.keys(grouped), a => grouped[a])
  return { author, blogs: grouped[author] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}
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