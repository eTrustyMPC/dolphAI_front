import { render, screen } from '@testing-library/react';
import { TokenPreviewCard } from '@/components/TokenPreview';

describe('TokenPreview', () => {
  const mockToken = {
    name: 'Test Token',
    address: '0x1234567890abcdef',
    symbol: 'TEST',
    description: 'A test token for testing',
    price: '100',
    icon: '/test-icon.png'
  };

  it('renders token card with basic information', () => {
    render(<TokenPreviewCard token={mockToken} />);
    
    expect(screen.getByText('Test Token')).toBeInTheDocument();
    expect(screen.getByText('0x1234567890abcdef')).toBeInTheDocument();
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  it('renders token description when provided', () => {
    render(<TokenPreviewCard token={mockToken} />);
    expect(screen.getByText('A test token for testing')).toBeInTheDocument();
  });

  it('renders analyze button', () => {
    render(<TokenPreviewCard token={mockToken} />);
    expect(screen.getByText('Analyze token')).toBeInTheDocument();
  });

  it('renders placeholder when no icon is provided', () => {
    render(<TokenPreviewCard token={{ ...mockToken, icon: undefined }} />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('renders token icon when provided', () => {
    render(<TokenPreviewCard token={mockToken} />);
    const icon = screen.getByAltText('Test Token') as HTMLImageElement;
    expect(icon).toBeInTheDocument();
    expect(icon.src).toContain('/test-icon.png');
  });
});
