import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { describe } from 'vitest'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Blog blog={{
        title: 'Component testing is done with react-testing-library',
        author: 'wilmar',
        url: 'https://testing-library.com/docs/react-testing-library/intro',
        likes: 5
      }} blogs={[]} setBlogs={() => {}} showNotification={() => {}} />
    ).container
  })

  test('renders title and author', async () => {
    await screen.findByText('Component testing is done with react-testing-library wilmar')

    const titleAuthor = screen.queryByText('Component testing is done with react-testing-library wilmar')
    expect(titleAuthor).toBeDefined()
  })

  test('at start the children are not displayed', async () => {
    const div = container.querySelector('.blog-complement')
    expect(div).toHaveStyle('display: none')

    const url = screen.queryByText('https://testing-library.com/docs/react-testing-library/intro')
    expect(url).toBeNull()

    const likes = screen.queryByText('likes: 5')
    expect(likes).toBeNull()
  })
})
