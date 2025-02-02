import { render, screen } from '@testing-library/react'
import { TokenPreviewCard } from '@/components/TokenPreview'
import { Token } from '@/components/TokenPreview/types'

describe('TokenPreview', () => {
  const mockToken: Token = {
    id: '1',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3000,
    icon: '/eth.png'
  }

  test('renders token card with correct information', () => {
    render(<TokenPreviewCard token={mockToken} />)
    
    expect(screen.getByText('Ethereum')).toBeInTheDocument()
    expect(screen.getByText('ETH')).toBeInTheDocument()
    expect(screen.getByText(/Price:/)).toHaveTextContent('3000')
    expect(screen.getByAltText('Ethereum')).toHaveAttribute('src', '/eth.png')
  })

  test('displays price with correct styling', () => {
    render(<TokenPreviewCard token={mockToken} />)
    
    const priceElement = screen.getByText(/3000/)
    expect(priceElement).toHaveClass('text-purple-400')
  })
})
