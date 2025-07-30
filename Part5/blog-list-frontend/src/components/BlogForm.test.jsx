import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('calls event handler with correct details when new blog is created', async () => {
  const mockCreateBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={mockCreateBlog} />)

  const titleInput = screen.getByPlaceholderText('write here title')
  const authorInput = screen.getByPlaceholderText('write here author')
  const urlInput = screen.getByPlaceholderText('write here url')
  const submitButton = screen.getByText('Add')

  await user.type(titleInput, 'Testing React components')
  await user.type(authorInput, 'John Doe')
  await user.type(urlInput, 'https://testing.com')

  await user.click(submitButton)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0]).toEqual({
    title: 'Testing React components',
    author: 'John Doe',
    url: 'https://testing.com',
  })
})
