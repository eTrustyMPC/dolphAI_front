import React, { useState } from 'react';
import { Repeat, Coins, PiggyBank, TrendingUp } from 'lucide-react';
import { useWallet } from '@suiet/wallet-kit';
import { CetusTerminal } from '@/components/Swap/CetusTerminal';
import { StakingPlatforms } from '@/components/Staking/StakingPlatforms';
import { LendingPlatforms } from '@/components/Lending/LendingPlatforms';
import { PerpsPlatform } from '@/components/Perps/PerpsPlatform';
import { mockStakingPools } from '@/services/mockStakingData';

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
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]'
        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
    }`}
  >
    <span className={`${isActive ? 'text-blue-400' : 'text-gray-400'} transition-colors`}>
      {icon}
    </span>
    <span>{label}</span>
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
        return (
          <div className="h-[520px]">
            <StakingPlatforms
              onPlatformClick={(url) => {
                // Open platform URL in new tab
                window.open(url, '_blank');
              }}
            />
          </div>
        );
      case 'lending':
        return (
          <div className="h-[520px]">
            <LendingPlatforms
              onPlatformClick={(url) => {
                // Open platform URL in new tab
                window.open(url, '_blank');
              }}
            />
          </div>
        );
      case 'perps':
        return (
          <div className="h-[520px]">
            <PerpsPlatform
              onPlatformClick={(url) => {
                // Open platform URL in new tab
                window.open(url, '_blank');
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative bg-[#0B1018] rounded-xl border border-gray-800/50 transition-all duration-300 ${isWalletConnected ? 'p-6' : 'p-4'}`}>
      <div className="flex gap-2 mb-4">
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
      <div className={`${isWalletConnected ? 'h-[540px]' : 'h-[200px]'} transition-all duration-300`}>
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
