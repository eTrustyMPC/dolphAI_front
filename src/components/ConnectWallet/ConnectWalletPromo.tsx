import React from 'react';
import { TrendingUp, FileText, Activity } from 'lucide-react';
import { CustomConnectButton } from '@/components/CustomConnectButton';

interface ConnectWalletPromoProps {
  tokenName: string;
  isWalletConnected: boolean;
  onConnectSuccess: () => void;
  onConnectError: (error: Error) => void;
}

export const ConnectWalletPromo: React.FC<ConnectWalletPromoProps> = ({
  tokenName,
  isWalletConnected,
  onConnectSuccess,
  onConnectError,
}) => {
  if (isWalletConnected) return null;

  return (
    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4">
      <div className="text-center">
        <h4 className="text-base font-semibold mb-2">Get More Insights</h4>
        <p className="text-gray-300 text-sm mb-4">
          Connect your wallet to get <span className="text-purple-400 font-medium">DETAILED</span> analytics about {tokenName} and to find <span className="text-purple-400 font-medium">BEST</span> staking opportunities and loan options
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <a 
            href="https://bluefin.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 py-1 bg-gray-800/50 rounded hover:bg-gray-700/50 transition-colors group"
          >
            <div className="p-1 bg-blue-500/10 rounded">
              <TrendingUp className="h-3 w-3 text-blue-400" />
            </div>
            <span className="text-xs font-medium group-hover:text-blue-400 transition-colors">Bluefin</span>
          </a>

          <a 
            href="https://suilend.fi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 py-1 bg-gray-800/50 rounded hover:bg-gray-700/50 transition-colors group"
          >
            <div className="p-1 bg-green-500/10 rounded">
              <FileText className="h-3 w-3 text-green-400" />
            </div>
            <span className="text-xs font-medium group-hover:text-green-400 transition-colors">SuiLend</span>
          </a>

          <a 
            href="https://app.naviprotocol.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 py-1 bg-gray-800/50 rounded hover:bg-gray-700/50 transition-colors group"
          >
            <div className="p-1 bg-yellow-500/10 rounded">
              <FileText className="h-3 w-3 text-yellow-400" />
            </div>
            <span className="text-xs font-medium group-hover:text-yellow-400 transition-colors">Navi</span>
          </a>

          <a 
            href="https://app.turbos.finance" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 py-1 bg-gray-800/50 rounded hover:bg-gray-700/50 transition-colors group"
          >
            <div className="p-1 bg-red-500/10 rounded">
              <TrendingUp className="h-3 w-3 text-red-400" />
            </div>
            <span className="text-xs font-medium group-hover:text-red-400 transition-colors">Turbo</span>
          </a>
        </div>

        <CustomConnectButton 
          onSuccess={onConnectSuccess}
          onError={onConnectError}
        />
      </div>
    </div>
  );
};
