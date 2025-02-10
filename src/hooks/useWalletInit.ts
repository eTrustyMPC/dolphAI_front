import { useEffect, useState } from 'react';
import { useWallet } from '@suiet/wallet-kit';
import { accountService } from '@/services/api/account';

export const useWalletInit = () => {
  const wallet = useWallet();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  console.log('useWalletInit: Initial state', {
    walletConnected: wallet.connected,
    walletAddress: wallet.address,
    isInitialized,
    isLoading,
    error
  });

  // Sync account with backend when wallet is connected
  useEffect(() => {
    console.log('useWalletInit: Effect running', {
      walletConnected: wallet.connected,
      walletAddress: wallet.address,
      isInitialized
    });

    const syncAccount = async () => {
      if (!isInitialized && wallet.connected && wallet.address) {
        console.log('useWalletInit: Syncing account...');
        try {
          setIsLoading(true);
          // This will create the account if it doesn't exist
          await accountService.findOrCreateAccount(wallet.address);
          
          setIsInitialized(true);
          localStorage.setItem('walletConnected', 'true');
          console.log('useWalletInit: Account synced successfully');
        } catch (err) {
          console.error('Error syncing account:', err);
          setError(err as Error);
          localStorage.removeItem('walletConnected');
        } finally {
          setIsLoading(false);
        }
      } else if (!wallet.connected) {
        console.log('useWalletInit: Wallet disconnected, resetting state');
        setIsInitialized(false);
        localStorage.removeItem('walletConnected');
      }
    };

    syncAccount();
  }, [wallet.connected, wallet.address, isInitialized]);

  return {
    wallet,
    isInitialized,
    isLoading,
    error,
    setIsLoading,
    setIsInitialized
  };
};
