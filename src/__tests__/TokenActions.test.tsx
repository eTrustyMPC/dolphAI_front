import { render, screen, fireEvent } from '@testing-library/react';
import { TokenActions } from '@/components/TokenPreview';

describe('TokenActions', () => {
  const mockToken = {
    links: {
      website: 'https://example.com',
      twitter: 'https://twitter.com/example',
      explorer: 'https://explorer.com/token/123'
    }
  };

  const mockHandlers = {
    onShare: jest.fn(),
    onFavorite: jest.fn(),
    onReport: jest.fn()
  };

  it('renders action buttons', () => {
    render(<TokenActions token={mockToken} {...mockHandlers} />);
    
    expect(screen.getByTitle('Share')).toBeInTheDocument();
    expect(screen.getByTitle('Add to favorites')).toBeInTheDocument();
    expect(screen.getByTitle('Report')).toBeInTheDocument();
  });

  it('calls the correct handlers when buttons are clicked', () => {
    render(<TokenActions token={mockToken} {...mockHandlers} />);
    
    fireEvent.click(screen.getByTitle('Share'));
    expect(mockHandlers.onShare).toHaveBeenCalledTimes(1);
    
    fireEvent.click(screen.getByTitle('Add to favorites'));
    expect(mockHandlers.onFavorite).toHaveBeenCalledTimes(1);
    
    fireEvent.click(screen.getByTitle('Report'));
    expect(mockHandlers.onReport).toHaveBeenCalledTimes(1);
  });

  it('renders external links when provided', () => {
    render(<TokenActions token={mockToken} {...mockHandlers} />);
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    
    expect(links[0]).toHaveAttribute('href', 'https://example.com');
    expect(links[1]).toHaveAttribute('href', 'https://twitter.com/example');
    expect(links[2]).toHaveAttribute('href', 'https://explorer.com/token/123');
  });

  it('opens links in new tab with proper security attributes', () => {
    render(<TokenActions token={mockToken} {...mockHandlers} />);
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('handles missing links gracefully', () => {
    render(<TokenActions {...mockHandlers} />);
    
    // Should not find any links
    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(0);
    
    // But should still render action buttons
    expect(screen.getByTitle('Share')).toBeInTheDocument();
    expect(screen.getByTitle('Add to favorites')).toBeInTheDocument();
    expect(screen.getByTitle('Report')).toBeInTheDocument();
  });

  it('renders with correct styling', () => {
    render(<TokenActions token={mockToken} {...mockHandlers} />);
    
    // Test share and favorite buttons
    const shareAndFavoriteButtons = [
      screen.getByTitle('Share'),
      screen.getByTitle('Add to favorites')
    ];
    shareAndFavoriteButtons.forEach(button => {
      expect(button).toHaveClass('p-2', 'text-gray-400', 'hover:text-purple-500', 'transition-colors');
    });
    
    // Test report button separately
    const reportButton = screen.getByTitle('Report');
    expect(reportButton).toHaveClass('p-2', 'text-gray-400', 'hover:text-red-500', 'transition-colors');
  });
});
