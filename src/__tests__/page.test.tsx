import GuestLayout from '@/app/(guest)/layout'
import Home from '@/app/(guest)/page'
import { render, screen } from '@testing-library/react'

describe('Home', () => {
  it('renders a heading', () => {
    render(
      <GuestLayout>
        <Home />
      </GuestLayout>
    )

    const heading = screen.getByRole('heading', {
      name: /로그인/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
