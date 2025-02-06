import React from 'react';
import { ArrowLeftRight, Coins, Wallet } from 'lucide-react';

interface TokenActionsProps {
  onActionClick: (action: 'swap' | 'stake' | 'lend') => void;
}

export const TokenActions: React.FC<TokenActionsProps> = ({ onActionClick }) => {
  const actions = [
    { id: 'swap', label: 'SWAP', icon: ArrowLeftRight },
    { id: 'stake', label: 'STAKE', icon: Coins },
    { id: 'lend', label: 'LEND', icon: Wallet },
  ] as const;

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Token Actions</h3>
      
      <div className="grid grid-cols-3 gap-4">
        {actions.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onActionClick(id)}
            className="bg-gray-800 hover:bg-gray-750 rounded-lg p-4 transition-colors flex flex-col items-center gap-2"
          >
            <Icon className="text-purple-500" size={24} />
            <span className="font-medium text-sm">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
