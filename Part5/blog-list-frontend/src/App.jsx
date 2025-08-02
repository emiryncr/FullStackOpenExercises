import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('Login successful:', user)
    }catch (exception) {
      console.error('Login failed:', exception)
      setNotification('Wrong username or password')
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
        setNotificationType('')
      }, 5000)
      setUsername('')
      setPassword('')
    }

  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
          username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
          password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setUsername('')
    setPassword('')
    console.log('Logged out')
  }

  const handleCreateBlog = async (blogObject) => {
    try{
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      console.log('Blog created:', createdBlog)
      setNotification(`A new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setNotificationType('success')
      setTimeout(() => {
        setNotification(null)
        setNotificationType('')
      }, 5000)
    }catch (exception) {
      console.error('Failed to create blog:', exception)
    }
  }

  const handleUpdateBlog = async (id, updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      console.log('Blog updated:', returnedBlog)
      setNotification(`Blog ${returnedBlog.title} updated`)
      setNotificationType('success')
      setTimeout(() => {
        setNotification(null)
        setNotificationType('')
      }, 5000)
    } catch (exception) {
      console.error('Failed to update blog:', exception)
    }
  }
  const copyBlogs = [...blogs]
  const sortedBlogs = copyBlogs.sort((a, b) => b.likes - a.likes)

  const handleDeleteBlog = async (id, blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return
    }

    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      console.log('Blog deleted:', id)
      setNotification(`Blog ${blog.title} deleted`)
      setNotificationType('success')
      setTimeout(() => {
        setNotification(null)
        setNotificationType('')
      }, 5000)
    } catch (exception) {
      console.error('Failed to delete blog:', exception)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} type={notificationType} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={notification} type={notificationType} />

      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel="new blog">
        <BlogForm
          createBlog={handleCreateBlog}
        />
      </Togglable>

      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={handleUpdateBlog}
          deleteBlog={handleDeleteBlog}
        />
      )}

    </div>
  )
}

export default App