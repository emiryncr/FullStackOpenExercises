const Blogs = require('../models/blog');

const initialBlogs = [
  {
    title: "Added Blog Title",
    author: "Added Author",
    url: "http://added-url.com",
    likes: 1,
  },
  { 
    title: "Test Blog",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 5,
  }
];

const nonExistingId = async () => {
    const blog = new Blogs({ title: 'willremovethis', author: 'unknown', url: 'https://example.com/willremovethis', likes: 0 });
    await blog.save();
    await blog.remove();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blogs.find({});
    return blogs.map(blog => blog.toJSON());
};

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb
};
