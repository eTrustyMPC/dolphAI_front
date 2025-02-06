import React from 'react';
import { WalletProvider } from '@suiet/wallet-kit';
import { CustomWalletProvider } from '@/contexts/WalletContext';

interface WalletProvidersProps {
  children: React.ReactNode;
}

export const WalletProviders: React.FC<WalletProvidersProps> = ({ children }) => {
  return (
    <WalletProvider>
      <CustomWalletProvider>
        {children}
      </CustomWalletProvider>
    </WalletProvider>
  );
};
