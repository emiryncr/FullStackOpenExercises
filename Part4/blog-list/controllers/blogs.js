const blogRouter = require('express').Router();
const Blog = require('../models/blog');
//root defined in app.js as '/api/blogs'

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
})

blogRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body

    if(!title || !url) {
        return response.status(400).json({ error: 'title and url are required' });
    }

    const blog = new Blog({
        title,
        author,
        url,
        likes: likes || 0
    });

    await blog.save()
    response.status(201).json(blog);
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