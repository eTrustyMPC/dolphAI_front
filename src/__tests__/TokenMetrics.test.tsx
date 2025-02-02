import { render, screen } from '@testing-library/react';
import { TokenMetrics } from '@/components/TokenPreview';

describe('TokenMetrics', () => {
  const mockMetrics = {
    holders: 1000,
    volume: 500000,
    marketCap: 1000000,
    liquidity: 100000,
    priceChange24h: 5.5
  };

  it('renders all metrics with correct values', () => {
    render(<TokenMetrics metrics={mockMetrics} />);
    
    // Check labels
    expect(screen.getByText('Holders')).toBeInTheDocument();
    expect(screen.getByText('24h Volume')).toBeInTheDocument();
    expect(screen.getByText('Market Cap')).toBeInTheDocument();
    
    // Check values with formatting
    expect(screen.getByText('1,000')).toBeInTheDocument();
    expect(screen.getByText('$500,000')).toBeInTheDocument();
    expect(screen.getByText('$1,000,000')).toBeInTheDocument();
  });

  it('renders zero values when metrics is not provided', () => {
    render(<TokenMetrics metrics={null} />);
    expect(screen.queryByTestId('metrics-grid')).not.toBeInTheDocument();
  });

  it('renders with partial data', () => {
    render(<TokenMetrics metrics={{ holders: 500, volume: 0, marketCap: 0, liquidity: 0, priceChange24h: 0 }} />);
    
    expect(screen.getByText('500')).toBeInTheDocument();
    const zeroValues = screen.getAllByText(/\$0/);
    expect(zeroValues).toHaveLength(2);
  });

  it('renders with the correct layout', () => {
    render(<TokenMetrics metrics={mockMetrics} />);
    
    const container = screen.getByTestId('metrics-grid');
    expect(container).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-4');
  });
});
