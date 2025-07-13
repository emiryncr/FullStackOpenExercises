const blogRouter = require('express').Router();
const Blog = require('../models/blog');
//root defined in app.js as '/api/blogs'
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
})

blogRouter.post('/', userExtractor, async (request, response) => {
    const { title, author, url, likes } = request.body
    const user = request.user

    if (!user) {
      return response.status(400).json({ error: 'user token missing or not valid' })
    }

    if (!title || !url) {
      return response.status(400).json({ error: 'title and url are required' });
    }

    const blog = new Blog({
        title,
        author,
        url,
        likes: likes || 0,
        user: user
    });

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    
    response.status(201).json(savedBlog);
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
    const user = request.user
    if (!user) {
      return response.status(401).json({ error: 'token invalid or user not found' })
    }

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    if (blog?.user.toString() === user._id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } else {
      return response.status(403).json({ error: 'only the creator can delete this blog' })
    }
    
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  ).populate('user', { username: 1, name: 1 })

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).json({ error: 'Blog not found' })
  }
})

module.exports = blogRouter;