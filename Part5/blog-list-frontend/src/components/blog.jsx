import { useState } from 'react';

const Blog = ({blog, updateBlog}) => {
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

    return (
        <div style={blogStyle}>
            <div>
                {blog.title}
                <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
                <div style={handleVisibility}>
                    <ul>
                        <li>{blog.url}</li>
                        <li>
                            {blog.likes} likes
                            <button onClick={handleLike}>like</button>
                        </li>
                        <li>{blog.author}</li>
                    </ul>
                </div>
            </div>
            
        </div>
    )
}

export default Blog;