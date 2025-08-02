import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    padding: 2,
    border: 'solid',
    borderWidth: 1,
    margin: 4
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleVisibility = { display: visible ? '' : 'none' }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    deleteBlog(blog.id, blog)
  }

  const isOwner = user && blog.user && (
    user.id === blog.user.id ||
    user.id === blog.user ||
    user.username === blog.user.username
  )

  return (
    <div style={blogStyle} className='blog'>
      <div className="blog-summary">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} className="toggle-button">{visible ? 'hide' : 'show'}</button>
        {visible && (
          <div className="blog-details">
            <ul>
              <li className="blog-url">{blog.url}</li>
              <li className="blog-likes">
                {blog.likes} likes
                <button onClick={handleLike} className="like-button">like</button>
              </li>
              <li className="blog-author">{blog.author}</li>
            </ul>
            {isOwner && (
              <button
                style={{ backgroundColor: 'red', color: 'white' }}
                onClick={handleDelete}
                className="delete-button"
              >
                delete
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
        name: PropTypes.string
      })
    ])
  }).isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string
  })
}

export default Blog