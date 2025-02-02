import { render, act, renderHook } from '@testing-library/react';
import { CustomWalletProvider, useCustomWallet } from '@/contexts/WalletContext';
import { useWallet } from '@suiet/wallet-kit';
import { useRouter } from 'next/router';

// Mock the @suiet/wallet-kit package
jest.mock('@suiet/wallet-kit', () => ({
  useWallet: jest.fn(),
}));

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('WalletContext', () => {
  const mockRouter = {
    pathname: '/',
    push: jest.fn(),
  };

  const mockWallet = {
    connected: false,
    select: jest.fn(),
    disconnect: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useWallet as jest.Mock).mockReturnValue(mockWallet);
    localStorage.clear();
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useCustomWallet(), {
      wrapper: CustomWalletProvider,
    });

    expect(result.current.isInitialized).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('attempts to reconnect if previously connected', () => {
    localStorage.setItem('walletConnected', 'true');

    render(
      <CustomWalletProvider>
        <div>Test</div>
      </CustomWalletProvider>
    );

    expect(mockWallet.select).toHaveBeenCalledWith('Suiet');
  });

  it('redirects to dashboard when connected', () => {
    const connectedWallet = { ...mockWallet, connected: true };
    (useWallet as jest.Mock).mockReturnValue(connectedWallet);

    render(
      <CustomWalletProvider>
        <div>Test</div>
      </CustomWalletProvider>
    );

    expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
    expect(localStorage.getItem('walletConnected')).toBe('true');
  });

  it('redirects to token-preview when disconnected from dashboard', () => {
    mockRouter.pathname = '/dashboard';
    const disconnectedWallet = { ...mockWallet, connected: false };
    (useWallet as jest.Mock).mockReturnValue(disconnectedWallet);

    render(
      <CustomWalletProvider>
        <div>Test</div>
      </CustomWalletProvider>
    );

    expect(mockRouter.push).toHaveBeenCalledWith('/token-preview');
    expect(localStorage.getItem('walletConnected')).toBe(null);
  });

  it('connects wallet successfully', async () => {
    const { result } = renderHook(() => useCustomWallet(), {
      wrapper: CustomWalletProvider,
    });

    await act(async () => {
      await result.current.connect();
    });

    expect(mockWallet.select).toHaveBeenCalledWith('Suiet');
  });

  it('disconnects wallet successfully', async () => {
    const { result } = renderHook(() => useCustomWallet(), {
      wrapper: CustomWalletProvider,
    });

    await act(async () => {
      await result.current.disconnect();
    });

    expect(mockWallet.disconnect).toHaveBeenCalled();
  });
});
