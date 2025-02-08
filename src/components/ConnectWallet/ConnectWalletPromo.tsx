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
    <div className="flex items-center justify-between gap-4">
      <div>
        <h4 className="text-sm font-medium text-white mb-1">Get More Insights</h4>
        <p className="text-xs text-gray-400 mb-2">
          Connect wallet to access <span className="text-purple-400 font-medium">detailed analytics</span> and <span className="text-purple-400 font-medium">DeFi features</span>
        </p>
        <div className="flex items-center gap-2">
          <a 
            href="https://bluefin.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-1.5 py-0.5 bg-gray-800/50 rounded hover:bg-gray-700/50 transition-colors group"
          >
            <div className="p-0.5 bg-blue-500/10 rounded">
              <TrendingUp className="h-2.5 w-2.5 text-blue-400" />
            </div>
            <span className="text-[10px] font-medium group-hover:text-blue-400 transition-colors">Bluefin</span>
          </a>

          <a 
            href="https://suilend.fi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-1.5 py-0.5 bg-gray-800/50 rounded hover:bg-gray-700/50 transition-colors group"
          >
            <div className="p-0.5 bg-green-500/10 rounded">
              <FileText className="h-2.5 w-2.5 text-green-400" />
            </div>
            <span className="text-[10px] font-medium group-hover:text-green-400 transition-colors">SuiLend</span>
          </a>

          <a 
            href="https://app.naviprotocol.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-1.5 py-0.5 bg-gray-800/50 rounded hover:bg-gray-700/50 transition-colors group"
          >
            <div className="p-0.5 bg-yellow-500/10 rounded">
              <FileText className="h-2.5 w-2.5 text-yellow-400" />
            </div>
            <span className="text-[10px] font-medium group-hover:text-yellow-400 transition-colors">Navi</span>
          </a>
        </div>
      </div>
      <CustomConnectButton 
        onSuccess={onConnectSuccess}
        onError={onConnectError}
      />
    </div>
  );
};
