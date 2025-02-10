import { ConnectButton } from '@suiet/wallet-kit';
import { Wallet } from 'lucide-react';

interface CustomConnectButtonProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export function CustomConnectButton({ onSuccess, onError }: CustomConnectButtonProps) {
  return (
    <div className="inline-block wkit-dark text-center">
      <ConnectButton
        onConnectSuccess={onSuccess}
        onConnectError={onError}
        className="!bg-transparent"
      >
        <div className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-500 to-crypto-500 hover:from-primary-600 hover:to-crypto-600 text-white rounded-xl transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
          <Wallet className="h-5 w-5" />
          <span>Connect Wallet</span>
        </div>
      </ConnectButton>
    </div>
  );
}
