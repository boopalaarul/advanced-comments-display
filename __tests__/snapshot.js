import { render } from '@testing-library/react'
import Page from '../src/app/page'
import CommentsSection from '../src/app/ui-components/comments-section'
 
it('renders homepage unchanged', () => {
  const { container } = render(<CommentsSection />)
  expect(container).toMatchSnapshot()
})