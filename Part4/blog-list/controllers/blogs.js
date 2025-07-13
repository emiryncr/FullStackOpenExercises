const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
//root defined in app.js as '/api/blogs'
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
})

blogRouter.post('/', async (request, response) => {
    const { title, author, url, likes, userId } = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }

    if (!title || !url) {
      return response.status(400).json({ error: 'title and url are required' });
    }

    const blog = new Blog({
        title,
        author,
        url,
        likes: likes || 0,
        user: user._id
    });

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    
    response.status(201).json(savedBlog);
})

blogRouter.delete('/:id', async (request, response) => {
    const id = request.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (deletedBlog) {
        response.status(204).end();
    } else {
        response.status(404).json({ error: 'Blog not found' });
    }
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).json({ error: 'Blog not found' })
  }
})

module.exports = blogRouter;