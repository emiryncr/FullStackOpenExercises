import { useState } from 'react';

const Blog = ({blog}) => {
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
                            <button>like</button>
                        </li>
                        <li>{blog.author}</li>
                    </ul>
                </div>
            </div>
            
        </div>
    )
}

export default Blog;