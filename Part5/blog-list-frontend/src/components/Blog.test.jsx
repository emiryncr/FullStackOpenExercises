import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './blog'

test('renders title and author but not URL or likes by default', () => {
  const blog = {
    id: '1',
    title: 'Component patterns',
    author: 'James Smith',
    url: 'https://example.com/component-patterns',
    likes: 5,
  }

  const mockUpdateBlog = vi.fn()
  const mockDeleteBlog = vi.fn()

  const { container } = render(
    <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
  )

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('Component patterns')
  expect(div).toHaveTextContent('James Smith')

  expect(div).not.toHaveTextContent('https://example.com/component-patterns')
  expect(div).not.toHaveTextContent('5')
})

test('shows URL and likes when the show button is clicked', async () => {
  const blog = {
    id: '1',
    title: 'Component patterns',
    author: 'James Smith',
    url: 'https://example.com/component-patterns',
    likes: 5,
  }

  const mockUpdateBlog = vi.fn()
  const mockDeleteBlog = vi.fn()
  const user = userEvent.setup()

  render(
    <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
  )

  const showButton = screen.getByText('show')
  await user.click(showButton)

  expect(
    screen.getByText('https://example.com/component-patterns')
  ).toBeDefined()
  expect(screen.getByText('5 likes')).toBeDefined()
})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    id: '1',
    title: 'Component patterns',
    author: 'James Smith',
    url: 'https://example.com/component-patterns',
    likes: 5,
  }

  const mockUpdateBlog = vi.fn()
  const mockDeleteBlog = vi.fn()
  const user = userEvent.setup()

  render(
    <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
  )

  const showButton = screen.getByText('show')
  await user.click(showButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockUpdateBlog.mock.calls).toHaveLength(2)
})
