import { useWallet } from '@suiet/wallet-kit';
import { useCustomWallet } from '@/contexts/WalletContext';
import { Wallet } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CustomConnectButton } from './CustomConnectButton';

export function Navbar() {
  const wallet = useWallet();
  const customWallet = useCustomWallet();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-950/80 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-[98%] mx-auto px-2">
        <div className="flex justify-between items-center h-14">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <span className="text-lg font-bold text-white">DolphAI</span>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center">
            {wallet.connected ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-400 font-mono text-sm">
                  {formatAddress(wallet.address)}
                </span>
                <button
                  onClick={() => customWallet.disconnect()}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <CustomConnectButton
                onSuccess={() => {
                  console.log('Wallet connected successfully');
                  if (wallet.address) {
                    router.push('/dashboard');
                  }
                }}
                onError={(err) => {
                  console.error('Connection error:', err);
                  setError('Failed to connect wallet. Please try again.');
                }}
              />
            )}
          </div>
        </div>
      </div>
      {error && (
        <div className="absolute top-full left-0 right-0 mt-1 px-2">
          <div className="max-w-[98%] mx-auto">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        </div>
      )}
    </nav>
  );
}
