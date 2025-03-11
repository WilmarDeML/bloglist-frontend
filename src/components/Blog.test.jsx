import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  let container
  const mockHandler = vi.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={{
        title: 'Component testing is done with react-testing-library',
        author: 'wilmar',
        url: 'https://testing-library.com/docs/react-testing-library/intro',
        likes: 5
      }} blogs={[]} handleUpdateLikes={mockHandler} handleRemoveBlog={() => {}} />
    ).container
  })

  test('renders title and author', async () => {
    await screen.findByText('Component testing is done with react-testing-library wilmar')
  })

  test('at start the children are not displayed', async () => {
    const div = container.querySelector('.blog-complement')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()

    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog-complement')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking the button calls event handler once', async () => {
    const user = userEvent.setup()

    const buttonView = screen.getByText('view')
    await user.click(buttonView)

    const buttonLike = screen.getByText('like')
    await user.click(buttonLike)
    await user.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe('<BlogForm />', () => {
  test('updates parent state and calls onSubmit', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm handleCreateBlog={createBlog} />)

    const inputTitle = screen.getByPlaceholderText('write a title...')
    const inputAuthor = screen.getByPlaceholderText('write an author...')
    const inputUrl = screen.getByPlaceholderText('write a url...')

    await user.type(inputTitle, 'testing title...')
    await user.type(inputAuthor, 'testing author...')
    await user.type(inputUrl, 'testing a url...')
    const sendButton = screen.getByText('create')

    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)

    const [[newBlog]] = createBlog.mock.calls

    expect(newBlog.title).toBe('testing title...')
    expect(newBlog.author).toBe('testing author...')
    expect(newBlog.url).toBe('testing a url...')
  })
})
