import React, { useState, useCallback, useEffect } from 'react';
import { useWallet } from '@suiet/wallet-kit';
import { TokenDashboardData } from './types';
import { Globe, Twitter, MessageSquare, FileText, ExternalLink, Clock, Search, LineChart, Activity, X } from 'lucide-react';
import { TokenMetrics } from '../TokenPreview/TokenMetrics';
import { ConfirmAnalysisModal } from './ConfirmAnalysisModal';
import { TokenLeaderboard } from './TokenLeaderboard';

interface TokenDashboardProps {
  data: TokenDashboardData;
  previewTokenAddress?: string;
  onAnalyze?: (address: string) => void;
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      active
        ? 'bg-purple-600 text-white'
        : 'text-gray-400 hover:text-white hover:bg-gray-800'
    }`}
  >
    {children}
  </button>
);

export const TokenDashboard: React.FC<TokenDashboardProps> = ({ 
  data, 
  previewTokenAddress,
  onAnalyze 
}) => {
  const wallet = useWallet();
  const [activeTab, setActiveTab] = useState<'swap' | 'staking' | 'lending' | 'perps'>('swap');
  const [searchInput, setSearchInput] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);
  const [isAnalysisActive, setIsAnalysisActive] = useState(false);
  const [leaderboardSearch, setLeaderboardSearch] = useState('');

  // Initial state - Not connected
  if (!wallet.connected) {
    return (
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">DolphAI Project</h1>
          <p className="text-gray-400 mb-8">Connect your wallet to start analyzing tokens</p>
        </div>
      </div>
    );
  }

  // Connected but no analysis yet
  if (!showFullAnalysis && !isAnalysisActive) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Analyze Token</h2>
            <div className="flex gap-4">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter token address"
                className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-white placeholder-gray-500"
              />
              <button
                onClick={() => {
                  setShowConfirmation(true);
                  setShowFullAnalysis(true);
                }}
                disabled={!searchInput}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 rounded-lg font-medium transition-colors"
              >
                Analyze
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (previewTokenAddress) {
      setSearchInput(previewTokenAddress);
      setShowFullAnalysis(true);
    }
  }, [previewTokenAddress]);

  const isValidAddress = (address: string) => {
    return address.startsWith('0x') && address.length === 42;
  };

  const wasAnalyzedBefore = (address: string) => {
    return data.analysisHistory.some(
      item => item.tokenAddress.toLowerCase() === address.toLowerCase()
    );
  };

  const clearAnalysis = () => {
    setIsAnalysisActive(false);
    setShowFullAnalysis(false);
  };

  const handleSearch = useCallback(() => {
    if (!searchInput) return;

    const input = searchInput.trim();
    if (isValidAddress(input)) {
      setShowConfirmation(true);
    } else {
      alert('Please enter a valid token address');
    }
  }, [searchInput]);

  const handleAnalysis = () => {
    if (onAnalyze) {
      onAnalyze(searchInput);
    }
    setShowConfirmation(false);
    setShowFullAnalysis(false);
    setIsAnalysisActive(true);
  };

  const handleTokenSelect = (address: string) => {
    setSearchInput(address);
    setShowConfirmation(true);
    setIsAnalysisActive(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      {/* Search Bar */}
      <div className="flex justify-center items-center gap-3 mb-8 pt-6 max-w-5xl mx-auto">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              clearAnalysis();
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter token name or address..."
            className="w-full bg-[#0D1117] text-white placeholder-gray-400 rounded-lg h-12 px-4 pl-12 pr-12 border-none focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-colors text-base"
          />
          {searchInput && (
            <button
              onClick={() => {
                setSearchInput('');
                clearAnalysis();
              }}
              className="absolute inset-y-0 right-3 p-1.5 hover:bg-gray-700 rounded-md transition-colors"
              title="Clear search"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-purple-400" />
            </button>
          )}
        </div>
      </div>

      {showFullAnalysis ? (
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium">Token Preview Analysis</h2>
            <button
              onClick={() => setShowConfirmation(true)}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <LineChart size={16} />
              Conduct Full Analysis
            </button>
          </div>
          <div className="text-gray-400 text-sm">
            View the complete token analysis to access detailed metrics, risk assessment, and community insights.
          </div>
        </div>
      ) : null}

      {searchInput && !isAnalysisActive && (
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium mb-2">Token Found</h2>
              <p className="text-gray-400 text-sm font-mono">{searchInput}</p>
            </div>
            <button
              onClick={() => setShowConfirmation(true)}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <LineChart size={16} />
              Analyze Token
            </button>
          </div>
        </div>
      )}

      {isAnalysisActive ? (
        <>
          {/* Token Info */}
          <div className="flex items-center gap-4 mb-6">
            {data.icon && (
              <img src={data.icon} alt={data.name} className="w-12 h-12 rounded-full" />
            )}
            <div>
              <h1 className="text-2xl font-bold">{data.name} ({data.symbol})</h1>
              <p className="text-gray-400 font-mono">{data.address}</p>
            </div>
          </div>

          {/* Basic Info & Links */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Market Info */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-lg p-4 h-full">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Market Cap</div>
                    <div className="text-lg font-medium">${data.marketCap}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Volume (24h)</div>
                    <div className="text-lg font-medium">${data.volume24h}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Holders</div>
                    <div className="text-lg font-medium">{data.holders}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Transfers (24h)</div>
                    <div className="text-lg font-medium">{data.onChainMetrics.transfers24h}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Links</h3>
              <div className="space-y-3">
                {data.links?.website && (
                  <a
                    href={data.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Globe size={16} />
                    <span>Website</span>
                    <ExternalLink size={12} className="ml-auto" />
                  </a>
                )}
                {data.links?.telegram && (
                  <a
                    href={data.links.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <MessageSquare size={16} />
                    <span>Telegram</span>
                    <ExternalLink size={12} className="ml-auto" />
                  </a>
                )}
                {data.links?.whitepaper && (
                  <a
                    href={data.links.whitepaper}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <FileText size={16} />
                    <span>Whitepaper</span>
                    <ExternalLink size={12} className="ml-auto" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            <TabButton
              active={activeTab === 'swap'}
              onClick={() => setActiveTab('swap')}
            >
              Swap Analysis
            </TabButton>
            <TabButton
              active={activeTab === 'staking'}
              onClick={() => setActiveTab('staking')}
            >
              Staking Analysis
            </TabButton>
            <TabButton
              active={activeTab === 'lending'}
              onClick={() => setActiveTab('lending')}
            >
              Lending Analysis
            </TabButton>
            <TabButton
              active={activeTab === 'perps'}
              onClick={() => setActiveTab('perps')}
            >
              Perps Analysis
            </TabButton>
          </div>

          {/* Analysis Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TokenMetrics metrics={{
              liquidity: data.metrics?.liquidityScore || 0,
              volume: data.volume24h || 0,
              priceChange24h: 0,
              holders: data.holders || 0,
              marketCap: data.marketCap || 0
            }} />
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Token Analysis</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Security Score</div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500" 
                      style={{ width: `${data.metrics?.securityScore || 0}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Community Score</div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: `${data.metrics?.communityScore || 0}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Liquidity Score</div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500" 
                      style={{ width: `${data.metrics?.liquidityScore || 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Analysis History */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Clock size={20} className="text-purple-500" />
                Recent Analysis History
              </h2>
              <div className="space-y-3 h-[360px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-700">
                {data.analysisHistory.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleTokenSelect(item.tokenAddress)}
                    className="w-full text-left bg-gray-800 p-3 rounded-lg text-sm hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.tokenName}</span>
                        <span className="text-gray-400">({item.tokenSymbol})</span>
                      </div>
                      <span className="text-gray-400 text-xs">{item.date}</span>
                    </div>
                    <div className="mb-2 font-mono text-xs text-gray-400 truncate">
                      {item.tokenAddress}
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      {item.llmSummary}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Token Leaderboard */}
          <TokenLeaderboard
            searchValue={leaderboardSearch}
            onSearchChange={setLeaderboardSearch}
            variant="dashboard"
            onAnalyze={handleTokenSelect}
          />
        </div>
      )}

      <ConfirmAnalysisModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleAnalysis}
        tokenAddress={searchInput}
        isExistingToken={wasAnalyzedBefore(searchInput)}
      />
    </div>
  );
};
