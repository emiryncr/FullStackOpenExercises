import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
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
            <button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleDelete} className="delete-button">delete</button>
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
    likes: PropTypes.number.isRequired
  }).isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog