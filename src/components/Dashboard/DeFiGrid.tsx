import React, { useState } from 'react';
import { Repeat, Coins, PiggyBank, TrendingUp } from 'lucide-react';
import { useWallet } from '@suiet/wallet-kit';
import { CetusTerminal } from '@/components/Swap/CetusTerminal';

interface DeFiGridProps {
  isWalletConnected: boolean;
}

interface TabProps {
  isActive: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ isActive, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-1.5 rounded transition-all ${
      isActive
        ? 'bg-gray-800 text-white'
        : 'text-gray-400 hover:text-white hover:bg-gray-800'
    }`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);

export const DeFiGrid: React.FC<DeFiGridProps> = ({ isWalletConnected }) => {
  const [activeTab, setActiveTab] = useState('swap');
  const wallet = useWallet();

  const tabs = [
    { id: 'swap', label: 'Swap', icon: <Repeat className="w-4 h-4" /> },
    { id: 'stake', label: 'Stake', icon: <Coins className="w-4 h-4" /> },
    { id: 'lending', label: 'Lending', icon: <PiggyBank className="w-4 h-4" /> },
    { id: 'perps', label: 'Perps', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'swap':
        return (
          <CetusTerminal isWalletConnected={isWalletConnected} wallet={wallet} />
        );
      case 'stake':
      case 'lending':
      case 'perps':
        return (
          <div className="flex items-center justify-center h-[520px] bg-gray-900/50 rounded-lg p-4">
            <div className="text-center space-y-3">
              <p className="text-gray-400 text-lg">
                Coming soon...
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative bg-gray-900/50 rounded-xl transition-all duration-300 ${isWalletConnected ? 'p-6' : 'p-4'}`}>
      <div className="flex gap-2 mb-3">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            isActive={activeTab === tab.id}
            icon={tab.icon}
            label={tab.label}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>
      <div className={`${isWalletConnected ? 'h-[600px]' : 'h-[200px]'} transition-all duration-300`}>
        {isWalletConnected ? (
          <div className="h-full overflow-hidden">
            {renderContent()}
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-gray-500 text-sm">Connect wallet to access DeFi features</div>
          </div>
        )}
      </div>
    </div>
  );
};
