import { useEffect, useState } from 'react';
import { useWallet } from '@suiet/wallet-kit';

export const useWalletInit = () => {
  const wallet = useWallet();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use useEffect instead of useLayoutEffect
  useEffect(() => {
    if (!isInitialized && wallet.connected) {
      setIsInitialized(true);
      localStorage.setItem('walletConnected', 'true');
    } else if (!wallet.connected) {
      localStorage.removeItem('walletConnected');
    }
  }, [wallet.connected, isInitialized]);

  return {
    wallet,
    isInitialized,
    isLoading,
    setIsLoading,
    setIsInitialized
  };
};
