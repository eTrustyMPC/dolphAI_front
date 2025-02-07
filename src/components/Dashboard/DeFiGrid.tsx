import React, { useState } from 'react';
import { Repeat, Coins, PiggyBank, TrendingUp } from 'lucide-react';

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
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
      isActive
        ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-blue-500/20'
        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const DeFiCard: React.FC<{
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}> = ({ title, value, change, isPositive }) => (
  <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-blue-500/20 rounded-xl backdrop-blur-sm overflow-hidden p-4">
    <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
    <div className="text-xl font-semibold mb-2">{value}</div>
    <div className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
      {change}
    </div>
  </div>
);

export const DeFiGrid: React.FC<DeFiGridProps> = ({ isWalletConnected }) => {
  const [activeTab, setActiveTab] = useState('swap');

  const tabs = [
    { id: 'swap', label: 'Swap', icon: <Repeat className="w-4 h-4" /> },
    { id: 'stake', label: 'Stake', icon: <Coins className="w-4 h-4" /> },
    { id: 'lending', label: 'Lending', icon: <PiggyBank className="w-4 h-4" /> },
    { id: 'perps', label: 'Perps', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  if (!isWalletConnected) {
    return (
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-blue-500/20 rounded-xl backdrop-blur-sm overflow-hidden p-6">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
            DeFi Analytics
          </h2>
          <p className="text-gray-400 mb-4">
            Connect your wallet to view detailed DeFi analytics and insights
          </p>
          <div className="flex justify-center gap-4 opacity-50">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 text-gray-500"
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'swap':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DeFiCard
              title="24h Volume"
              value="$12.5M"
              change="+15.2%"
              isPositive={true}
            />
            <DeFiCard
              title="Total Liquidity"
              value="$45.8M"
              change="+8.7%"
              isPositive={true}
            />
            <DeFiCard
              title="Trades"
              value="2,345"
              change="-3.1%"
              isPositive={false}
            />
            <DeFiCard
              title="Unique Users"
              value="892"
              change="+12.4%"
              isPositive={true}
            />
          </div>
        );
      case 'stake':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DeFiCard
              title="Total Staked"
              value="$28.3M"
              change="+5.8%"
              isPositive={true}
            />
            <DeFiCard
              title="APY"
              value="12.5%"
              change="+2.3%"
              isPositive={true}
            />
            <DeFiCard
              title="Stakers"
              value="1,234"
              change="+9.2%"
              isPositive={true}
            />
            <DeFiCard
              title="Rewards Distributed"
              value="$89.4K"
              change="+15.7%"
              isPositive={true}
            />
          </div>
        );
      case 'lending':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DeFiCard
              title="Total Supplied"
              value="$34.2M"
              change="+7.4%"
              isPositive={true}
            />
            <DeFiCard
              title="Total Borrowed"
              value="$21.8M"
              change="-2.8%"
              isPositive={false}
            />
            <DeFiCard
              title="Supply APY"
              value="8.2%"
              change="+1.5%"
              isPositive={true}
            />
            <DeFiCard
              title="Borrow APY"
              value="12.8%"
              change="+3.2%"
              isPositive={true}
            />
          </div>
        );
      case 'perps':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DeFiCard
              title="Open Interest"
              value="$15.7M"
              change="+12.3%"
              isPositive={true}
            />
            <DeFiCard
              title="24h Volume"
              value="$8.9M"
              change="+18.5%"
              isPositive={true}
            />
            <DeFiCard
              title="Active Traders"
              value="456"
              change="+5.9%"
              isPositive={true}
            />
            <DeFiCard
              title="Liquidations"
              value="$234.5K"
              change="-8.7%"
              isPositive={false}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
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
      <div className="animate-fade-in">{renderContent()}</div>
    </div>
  );
};
