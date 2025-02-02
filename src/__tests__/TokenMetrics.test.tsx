import { render, screen } from '@testing-library/react';
import { TokenMetrics } from '@/components/TokenPreview';

describe('TokenMetrics', () => {
  const mockToken = {
    holders: 1000,
    volume24h: 500000,
    marketCap: 1000000
  };

  it('renders all metrics with correct values', () => {
    render(<TokenMetrics token={mockToken} />);
    
    // Check labels
    expect(screen.getByText('Holders')).toBeInTheDocument();
    expect(screen.getByText('24h Volume')).toBeInTheDocument();
    expect(screen.getByText('Market Cap')).toBeInTheDocument();
    
    // Check values with formatting
    expect(screen.getByText('1,000')).toBeInTheDocument();
    expect(screen.getByText(/\$500,000/)).toBeInTheDocument();
    expect(screen.getByText(/\$1,000,000/)).toBeInTheDocument();
  });

  it('renders zero values when token data is not provided', () => {
    render(<TokenMetrics />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
    // Use getAllByText for multiple $0 values
    const zeroValues = screen.getAllByText(/\$0/);
    expect(zeroValues).toHaveLength(2);
  });

  it('renders with partial data', () => {
    render(<TokenMetrics token={{ holders: 500 }} />);
    
    expect(screen.getByText('500')).toBeInTheDocument();
    const zeroValues = screen.getAllByText(/\$0/);
    expect(zeroValues).toHaveLength(2);
  });

  it('renders with the correct layout', () => {
    render(<TokenMetrics token={mockToken} />);
    
    const container = screen.getByTestId('metrics-grid');
    expect(container).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-4');
  });
});
