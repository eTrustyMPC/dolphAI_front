import { createContext, useContext, useEffect, useState } from 'react';
import { useWallet } from '@suiet/wallet-kit';
import { useRouter } from 'next/router';

interface CustomWalletContextType {
  isInitialized: boolean;
  isLoading: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const CustomWalletContext = createContext<CustomWalletContextType>({
  isInitialized: false,
  isLoading: false,
  connect: async () => {},
  disconnect: async () => {},
});

export const CustomWalletProvider = ({ children }: { children: React.ReactNode }) => {
  const wallet = useWallet();
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const wasConnected = localStorage.getItem('walletConnected');
    console.log('WalletContext: Initial load', { wasConnected });
    
    if (wasConnected === 'true' && !wallet.connected) {
      console.log('WalletContext: Attempting to reconnect wallet');
      wallet.select('Suiet');
    }

    setIsInitialized(true);
    setIsLoading(false);
  }, [wallet]);

  useEffect(() => {
    console.log('WalletContext: Wallet connection changed', { connected: wallet.connected });
    if (wallet.connected) {
      localStorage.setItem('walletConnected', 'true');
      // Only redirect if we're not already on the dashboard
      if (router.pathname !== '/dashboard') {
        console.log('WalletContext: Redirecting to dashboard');
        router.push('/dashboard');
      }
    } else {
      localStorage.removeItem('walletConnected');
      if (router.pathname === '/dashboard') {
        console.log('WalletContext: Redirecting to token-preview');
        router.push('/token-preview');
      }
    }
  }, [wallet.connected, router]);

  const connect = async () => {
    try {
      console.log('WalletContext: Connecting wallet');
      setIsLoading(true);
      await wallet.select('Suiet');
    } catch (error) {
      console.error('WalletContext: Error connecting wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = async () => {
    try {
      console.log('WalletContext: Disconnecting wallet');
      setIsLoading(true);
      await wallet.disconnect();
      localStorage.removeItem('walletConnected');
      router.push('/token-preview');
    } catch (error) {
      console.error('WalletContext: Error disconnecting wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomWalletContext.Provider
      value={{
        isInitialized,
        isLoading,
        connect,
        disconnect,
      }}
    >
      {children}
    </CustomWalletContext.Provider>
  );
};

export const useCustomWallet = () => {
  const context = useContext(CustomWalletContext);
  if (!context) {
    throw new Error('useCustomWallet must be used within a CustomWalletProvider');
  }
  return context;
};
