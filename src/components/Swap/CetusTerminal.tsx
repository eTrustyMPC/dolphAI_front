import React, { useEffect } from 'react';
import { WalletContextState } from '@suiet/wallet-kit';

interface CetusTerminalProps {
  isWalletConnected: boolean;
  wallet: WalletContextState;
}

const LoadingTerminal = () => (
  <div className="flex items-center justify-center h-[500px] bg-gray-900/50 rounded-lg p-4">
    <div className="text-center space-y-3">
      <p className="text-gray-400 text-sm">
        Loading Cetus Terminal...
      </p>
    </div>
  </div>
);

export const CetusTerminal: React.FC<CetusTerminalProps> = ({ isWalletConnected, wallet }) => {
  useEffect(() => {
    // Initialize Cetus Terminal when the component mounts
    if (isWalletConnected && window.CetusSwap) {
      window.CetusSwap.init({
        containerId: "cetus-terminal",
        independentWallet: true,
        displayMode: 'Integrated',
        theme: 'dark',
        defaultSlippage: 0.5,
        walletSigner: wallet,
        hideHeader: true,
        hideVolume: true,
        hideFooter: true,
        hideSlippageSettings: true
      });
    }
  }, [isWalletConnected, wallet]);

  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-gray-900/50 rounded-lg overflow-hidden w-[540px]">
        <div id="cetus-terminal" className="w-full h-[520px]" />
      </div>
    </div>
  );
};
