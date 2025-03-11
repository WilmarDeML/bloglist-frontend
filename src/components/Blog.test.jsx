import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

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
