import { screen } from '@testing-library/react'
import Home from '@/app/(guest)/Home'
import { renderWithClient } from '@/utils/testUtils'

describe('Home', () => {
  it('renders a heading', () => {
    renderWithClient(<Home />)

    const heading = screen.getByRole('heading', {
      name: /로그인/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
