const Blogs = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt')

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

const newBlog = {
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2
}

const newBlogWithoutLikes = {
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
}

const blogWithoutTitle = {
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7
}

const blogWithoutUrl = {
  title: 'React patterns',
  author: 'Michael Chan',
  likes: 7
}

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

const initialUsers = [
  {
    username: 'user1',
    name: 'User One',
    passwordHash: bcrypt.hashSync('user1', 10)
  },
  {
    username: 'user2',
    name: 'User Two',
    passwordHash: bcrypt.hashSync('user2', 10)
  }
]

const loginUser = {
  username: 'loginUser',
  name: 'Login User',
  password: 'secret'
}

const uniqueUser = {
  username: 'unique',
  password: 'secret'
}

const notUniqueUser = {
  username: 'user1',
  password: 'user1'
}

const userWithOutPassword = {
  username: 'user3'
}

const userWithShortPassword = {
  username: 'user4',
  password: 'pw'
}

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
}

const addLoginUser = async () => {
  const passwordHash = await bcrypt.hash(loginUser.password, 10)
  const user = new User({ username: loginUser.username, name: loginUser.name, passwordHash })
  await user.save()
}

module.exports = {
  initialBlogs,
  newBlog,
  newBlogWithoutLikes,
  blogWithoutTitle,
  blogWithoutUrl,
  blogsInDb,
  initialUsers,
  loginUser,
  uniqueUser,
  notUniqueUser,
  userWithOutPassword,
  userWithShortPassword,
  usersInDb,
  addLoginUser
}
