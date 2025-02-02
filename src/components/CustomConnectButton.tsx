import { ConnectButton } from '@suiet/wallet-kit';
import { Wallet } from 'lucide-react';

interface CustomConnectButtonProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export function CustomConnectButton({ onSuccess, onError }: CustomConnectButtonProps) {
  return (
    <div className="inline-block">
      <ConnectButton
        onConnectSuccess={onSuccess}
        onConnectError={onError}
        className="!bg-black"
      >
        <div className="flex items-center gap-2 px-6 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <Wallet className="h-5 w-5" />
          Connect Wallet
        </div>
      </ConnectButton>
    </div>
  );
}
