import {useState} from 'react'

const BlogForm = ({createBlog}) => {
    const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url
        })

        setNewBlog({ title: '', author: '', url: '' })
    }

    return (
        <div>
            <h2>Create</h2>
            <form onSubmit={addBlog}>
                <label>title:</label>
                <input 
                type="text" 
                value={newBlog.title}
                onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
                />
                <br />
                <label>author:</label>
                <input 
                type="text" 
                value={newBlog.author}
                onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
                />
                <br />
                <label>url:</label>
                <input 
                type="text" 
                value={newBlog.url}
                onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
                />
                <br />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default BlogForm;