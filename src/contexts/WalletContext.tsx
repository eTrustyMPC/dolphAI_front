import { createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { useWalletInit } from '@/hooks/useWalletInit';

export interface CustomWalletContextType {
  isInitialized: boolean;
  isLoading: boolean;
  error: Error | null;
  address?: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const CustomWalletContext = createContext<CustomWalletContextType>({
  isInitialized: false,
  isLoading: false,
  error: null,
  address: undefined,
  isConnected: false,
  connect: async () => {},
  disconnect: async () => {},
});

export const CustomWalletProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { wallet, isInitialized, isLoading, error, setIsLoading, setIsInitialized } = useWalletInit();

  console.log('WalletContext: State', {
    isInitialized,
    isLoading,
    error,
    walletConnected: wallet.connected,
    walletAddress: wallet.address
  });

  const connect = async () => {
    console.log('WalletContext: Connecting wallet...');
    if (isLoading || !wallet.select) {
      console.log('WalletContext: Cannot connect - loading or no wallet.select');
      return;
    }
    try {
      setIsLoading(true);
      await wallet.select('Suiet');
      console.log('WalletContext: Wallet selected successfully');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      localStorage.removeItem('walletConnected');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = async () => {
    console.log('WalletContext: Disconnecting wallet...');
    if (isLoading) {
      console.log('WalletContext: Cannot disconnect - loading');
      return;
    }
    try {
      setIsLoading(true);
      await wallet.disconnect();
      localStorage.removeItem('walletConnected');
      setIsInitialized(false);
      console.log('WalletContext: Wallet disconnected successfully');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomWalletContext.Provider
      value={{
        isInitialized,
        isLoading,
        error,
        address: wallet.address,
        isConnected: wallet.connected,
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

export default CustomWalletProvider;
