import { createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { useWalletInit } from '@/hooks/useWalletInit';

export interface CustomWalletContextType {
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
  const router = useRouter();
  const { wallet, isInitialized, isLoading, setIsLoading, setIsInitialized } = useWalletInit();

  const connect = async () => {
    if (isLoading || !wallet.select) return;
    try {
      setIsLoading(true);
      await wallet.select('Suiet');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      localStorage.removeItem('walletConnected');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await wallet.disconnect();
      localStorage.removeItem('walletConnected');
      setIsInitialized(false);
      router.push('/token-preview');
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
