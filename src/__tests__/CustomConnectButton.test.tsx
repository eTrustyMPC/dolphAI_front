import { render, screen, fireEvent } from '@testing-library/react';
import { CustomConnectButton } from '@/components/CustomConnectButton';
import { ConnectButton } from '@suiet/wallet-kit';

// Mock the @suiet/wallet-kit package
jest.mock('@suiet/wallet-kit', () => ({
  ConnectButton: jest.fn(({ children, onConnectSuccess, onConnectError }) => (
    <button
      onClick={() => onConnectSuccess()}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onConnectError(new Error('Connection cancelled'));
        }
      }}
      data-testid="mock-connect-button"
    >
      {children}
    </button>
  )),
}));

describe('CustomConnectButton', () => {
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<CustomConnectButton onSuccess={mockOnSuccess} onError={mockOnError} />);
    
    // Check if the button is rendered with correct text
    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
    
    // Check if the wallet icon is rendered
    const icon = screen.getByTestId('mock-connect-button').querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('calls onSuccess when connection is successful', () => {
    render(<CustomConnectButton onSuccess={mockOnSuccess} onError={mockOnError} />);
    
    // Simulate successful connection
    fireEvent.click(screen.getByTestId('mock-connect-button'));
    
    expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    expect(mockOnError).not.toHaveBeenCalled();
  });

  it('calls onError when connection fails', () => {
    render(<CustomConnectButton onSuccess={mockOnSuccess} onError={mockOnError} />);
    
    // Simulate connection error by pressing Escape
    fireEvent.keyDown(screen.getByTestId('mock-connect-button'), { key: 'Escape' });
    
    expect(mockOnError).toHaveBeenCalledTimes(1);
    expect(mockOnError).toHaveBeenCalledWith(expect.any(Error));
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('has correct styling', () => {
    render(<CustomConnectButton onSuccess={mockOnSuccess} onError={mockOnError} />);
    
    const button = screen.getByTestId('mock-connect-button');
    const buttonContent = button.firstChild as HTMLElement;
    
    // Check if the button has the correct classes
    expect(buttonContent).toHaveClass(
      'flex',
      'items-center',
      'gap-2',
      'px-6',
      'py-2.5',
      'bg-purple-500',
      'hover:bg-purple-600',
      'text-white',
      'rounded-lg',
      'transition-colors',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed'
    );
  });
});
