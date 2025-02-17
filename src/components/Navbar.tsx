import { useWallet } from '@suiet/wallet-kit';
import { useCustomWallet } from '@/contexts/WalletContext';
import { Wallet, Globe } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { XIcon } from './icons/XIcon';
import Link from 'next/link';
import Image from 'next/image';
import { CustomConnectButton } from './CustomConnectButton';

export default function Navbar() {
  const wallet = useWallet();
  const customWallet = useCustomWallet();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#0A0A0A] z-50">
      <div className="max-w-[98%] mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="w-12 h-12">
              <Image 
                src="/images/dolphai-logo.png"
                alt="DolphAI Logo"
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <span className="text-2xl font-bold text-[#40A9FF]">DolphAI</span>
          </div>

          {/* Wallet Connection and Social Icons */}
          <div className="flex items-center">
            {/* Social Icons */}
            <div className="flex items-center gap-4 mr-8">
              <a
                href="https://x.com/DolphAI_SUI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
              >
                <XIcon size={20} />
              </a>
              <a
                href="https://www.dolphai.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Globe size={20} />
              </a>
            </div>

            {/* Wallet Connection */}
            {wallet.connected ? (
              <div className="flex items-center gap-3">
                <span className="text-white/80 font-mono text-sm">
                  {wallet.address ? formatAddress(wallet.address) : '...'}
                </span>
                <button
                  onClick={() => customWallet.disconnect()}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-crypto-500 hover:from-primary-600 hover:to-crypto-600 rounded-xl transition-colors text-white font-medium"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <CustomConnectButton
                onSuccess={() => {
                  console.log('Wallet connected successfully');
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
