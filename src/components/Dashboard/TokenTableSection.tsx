import React, { useMemo } from 'react';
import { Shield, Search, TrendingUp, FileText } from 'lucide-react';
import { DeFiGrid } from '@/components/Dashboard/DeFiGrid';
import { AgentCard } from '@/components/Agent/AgentCard';
import { mockValueAgent, mockScoringAgents } from '@/services/mockAgentData';
import { Token } from '@/components/TokenPreview/types';
import { ConnectWalletPromo } from '@/components/ConnectWallet/ConnectWalletPromo';
import { NewsSection } from '../Agent/NewsSection';
import { TokenInfo } from '../Token/TokenInfo';
import { TokenSearch } from '../Token/TokenSearch';
import { TokenLeaderboard } from '../Token/TokenLeaderboard';
import Image from 'next/image';

interface Props {
  showLeaderboard: boolean;
  setShowLeaderboard: (show: boolean) => void;
  leaderboardSearch: string;
  setLeaderboardSearch: (search: string) => void;
  tokens: Token[];
  handleTokenSelect: (token: Token) => void;
  watchlist: Token[];
  onToggleWatchlist: (address: string) => void;
  copiedAddress: string;
  handleCopyAddress: (address: string) => void;
  selectedToken: Token | null;
  isWalletConnected: boolean;
  onConnectSuccess: () => void;
  onConnectError: (error: Error) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchClear: () => void;
  handleAnalyzeToken: (token: Token) => void;
  filteredTokens: Token[];
  setSelectedToken: (token: Token | null) => void;
  wallet: { isInitialized: boolean; address: string | undefined | null };
  isAnalyzed: boolean;
}

const defaultToken: Token = {
  id: 'default',
  name: 'Example Token',
  symbol: 'ETK',
  address: '0x1234...5678',
  price: '0.00',
  marketCapChange: '0%',
  volumeChange24h: '0%',
  queryCount: 0,
  links: {
    website: undefined,
    whitepaper: undefined,
    contract: undefined,
    explorer: undefined,
    telegram: undefined
  },
  dynamics: {
    weeklyHolderChange: 0
  }
};

export const TokenTableSection: React.FC<Props> = ({
  wallet: { address: walletAddress },
  showLeaderboard,
  setShowLeaderboard,
  leaderboardSearch,
  setLeaderboardSearch,
  tokens,
  handleTokenSelect,
  watchlist,
  onToggleWatchlist,
  copiedAddress,
  handleCopyAddress,
  selectedToken,
  isWalletConnected,
  onConnectSuccess,
  onConnectError,
  searchQuery,
  setSearchQuery,
  handleSearchClear,
  handleAnalyzeToken,
  filteredTokens,
  setSelectedToken,
  isAnalyzed,
}) => {
  // Sort tokens by volume
  const sortedTokens = useMemo(
    () => {
      console.log('Sorting tokens:', tokens.length); // Debug log
      return tokens.sort((a, b) => (b.volume24h ?? 0) - (a.volume24h ?? 0));
    },
    [tokens]
  );

  // Filter tokens by search and limit
  const displayedTokens = useMemo(
    () => {
      console.log('Filtering tokens:', { sortedTokens, leaderboardSearch, showLeaderboard }); // Debug log
      const filtered = sortedTokens.filter(token => 
        !leaderboardSearch || 
        token.name.toLowerCase().includes(leaderboardSearch.toLowerCase()) ||
        token.symbol.toLowerCase().includes(leaderboardSearch.toLowerCase())
      );
      const result = showLeaderboard ? filtered : filtered.slice(0, 5);
      console.log('Filtered result:', result.length); // Debug log
      return result;
    },
    [sortedTokens, leaderboardSearch, showLeaderboard]
  );

  const getGradientClass = (index: number) => {
    const gradients = [
      'from-purple-500 to-purple-400',
      'from-purple-400 to-purple-300',
      'from-purple-300 to-purple-200',
      'from-purple-200 to-purple-100',
      'from-purple-100 to-purple-50',
    ];
    return gradients[Math.min(index, gradients.length - 1)];
  };

  const handleAnalyzeTokenClick = (token: Token) => {
    setSelectedToken(token);
    handleAnalyzeToken(token);
  };

  const [activeTab, setActiveTab] = React.useState<'leaderboard' | 'watchlist'>('leaderboard');
  const [showWatchlist, setShowWatchlist] = React.useState(false);

  // Get tokens for current tab
  const displayedTokensWithWatchlist = useMemo(() => {
    console.log('Getting tokens for tab:', { activeTab, tokens: tokens.length, watchlist }); // Debug log
    return activeTab === 'watchlist' 
      ? tokens.filter(token => watchlist.some(w => w.address === token.address))
      : displayedTokens;
  }, [activeTab, tokens, watchlist, displayedTokens]);

  return (
    <div className="flex gap-8 h-full min-h-[32rem] mt-8 relative">
      <div className="w-full h-full flex gap-8">
        {/* Left Side - Leaderboard, News & Connect Wallet */}
        <div className="flex flex-col gap-4 w-[400px]">
          {/* Leaderboard & Watchlist */}
          <div className="border border-blue-500/30 rounded-2xl overflow-hidden bg-[#151820]">
            <div className="flex border-b border-gray-800">
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'leaderboard' ? 'text-white bg-purple-500/10' : 'text-gray-400 hover:text-white hover:bg-purple-500/5'}`}
              >
                Leaderboard
              </button>
              <button
                onClick={() => setActiveTab('watchlist')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'watchlist' ? 'text-white bg-purple-500/10' : 'text-gray-400 hover:text-white hover:bg-purple-500/5'}`}
              >
                Watchlist
              </button>
            </div>
            {activeTab === 'watchlist' && !isWalletConnected ? (
              <div className="p-6 flex flex-col items-center justify-center text-center h-[32rem]">
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Get More Insights</h4>
                  <p className="text-xs text-gray-400 mb-2">
                    Connect wallet to access <span className="text-purple-400 font-medium">detailed analytics</span> and <span className="text-purple-400 font-medium">DeFi features</span>
                  </p>
                  <div className="flex items-center justify-center gap-2">
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
                  </div>
                </div>
              </div>
            ) : (
              <TokenLeaderboard
                showLeaderboard={activeTab === 'leaderboard' ? showLeaderboard : showWatchlist}
                setShowLeaderboard={activeTab === 'leaderboard' ? setShowLeaderboard : setShowWatchlist}
                leaderboardSearch={leaderboardSearch}
                setLeaderboardSearch={setLeaderboardSearch}
                displayedTokens={displayedTokensWithWatchlist}
                handleTokenSelect={handleTokenSelect}
                getGradientClass={getGradientClass}
                copiedAddress={copiedAddress}
                handleCopyAddress={handleCopyAddress}
                watchlist={watchlist}
                onToggleWatchlist={onToggleWatchlist}
                activeTab={activeTab}
                walletAddress={walletAddress || ''}
                isWalletConnected={isWalletConnected}
              />
            )}
          </div>

          {/* News */}
          <div className={`transition-all duration-200 ${(!isWalletConnected && !isAnalyzed) ? 'blur-sm opacity-50' : ''}`}>
            <div className="bg-gray-900/40 border border-blue-500/30 rounded-2xl p-4">
              <NewsSection 
                token={selectedToken || defaultToken}
                news={[
                  { 
                    id: '1',
                    title: 'SUI Network Upgrade: Enhanced Performance',
                    source: 'Official Blog',
                    date: '1h ago',
                    url: 'https://suiexplorer.com/news/upgrade',
                    type: 'news'
                  },
                  {
                    id: '2',
                    title: 'DeFi Growth Report Q1: 45% TVL Increase',
                    source: 'SUI Analytics',
                    date: '3h ago',
                    url: 'https://suiexplorer.com/news/defi-q1',
                    type: 'news'
                  },
                  {
                    id: '3',
                    title: 'New Validator Onboarding Program Launched',
                    source: 'Official Blog',
                    date: '5h ago',
                    url: 'https://suiexplorer.com/news/validators',
                    type: 'news'
                  },
                  {
                    id: '4',
                    title: 'Ecosystem Fund: $50M for Developer Growth',
                    source: 'Medium',
                    date: '8h ago',
                    url: 'https://suiexplorer.com/news/fund',
                    type: 'news'
                  },
                  {
                    id: '5',
                    title: 'Developer Tooling Update: Move IDE 2.0',
                    source: 'Dev Portal',
                    date: '12h ago',
                    url: 'https://suiexplorer.com/news/tools',
                    type: 'news'
                  }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Right Side - Search, Token Info & Agents */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Search */}
          <TokenSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchClear={handleSearchClear}
            handleAnalyzeToken={handleAnalyzeTokenClick}
            setSelectedToken={setSelectedToken}
            filteredTokens={filteredTokens}
          />

          {/* Main Content */}
          <div className="relative mt-4">
            <div className={`transition-all duration-200 ${(!searchQuery || !selectedToken) ? 'blur-sm opacity-50' : ''}`}>
              {/* Token Info & Agent Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Token Info - Left Side */}
                <div className="bg-gray-900/40 border border-blue-500/30 rounded-2xl p-4">
                  <TokenInfo
                    token={selectedToken || defaultToken}
                    watchlist={watchlist}
                    copiedAddress={copiedAddress}
                    onToggleWatchlist={onToggleWatchlist}
                    handleCopyAddress={handleCopyAddress}
                    isWalletConnected={isWalletConnected}
                    walletAddress={walletAddress || ''}
                  />
                </div>

                {/* Agents - Right Side */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
                  <AgentCard agent={mockScoringAgents[0]} />
                </div>
              </div>

              {/* Connect Wallet Promo */}
              {selectedToken && !isWalletConnected && (
                <div className="bg-gray-900/40 border border-blue-500/30 rounded-2xl p-3 mb-6">
                  <ConnectWalletPromo
                    tokenName={selectedToken.name}
                    isWalletConnected={isWalletConnected}
                    onConnectSuccess={onConnectSuccess}
                    onConnectError={onConnectError}
                  />
                </div>
              )}

              {/* Agents Grid */}
              <div className={`grid grid-cols-3 gap-4 mb-6 ${!isWalletConnected ? 'blur-sm opacity-50' : ''}`}>
                {/* FA Agent */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-2">
                  <AgentCard 
                    agent={{
                      ...mockScoringAgents[1],
                      links: []
                    }} 
                  />
                </div>

                {/* Technical Analysis Agent - Coming Soon */}
                <div className="relative bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
                  <AgentCard 
                    agent={{
                      ...mockScoringAgents[0],
                      name: 'Technical Analysis',
                      imageUrl: '/images/agents/technical.png'
                    }}
                    isComingSoon
                  />
                  <div className="absolute inset-0 backdrop-blur-[6px] bg-[#0F1729]/50 rounded-2xl z-10 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Sentimental Analysis Agent is Coming Soon</p>
                    </div>
                  </div>
                </div>

                {/* Value Analysis Agent - Coming Soon */}
                <div className="relative bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
                  <AgentCard 
                    agent={{
                      ...mockScoringAgents[0],
                      name: 'Value Analysis',
                      imageUrl: '/images/agents/value.png'
                    }}
                    isComingSoon
                  />
                  <div className="absolute inset-0 backdrop-blur-[6px] bg-[#0F1729]/50 rounded-2xl z-10 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Defi Agent is Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* DeFi Section */}
              <div className="relative mb-8">
              <div className={`bg-[#0B1018] border border-blue-500/30 rounded-2xl ${!isWalletConnected ? 'blur-sm opacity-50' : ''}`}>
                  <DeFiGrid isWalletConnected={isWalletConnected} />
                </div>
              </div>
            </div>

            {/* Centered Message */}
            {(!searchQuery || !selectedToken) && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm rounded-2xl">
                <div className="text-center px-12 py-8 bg-gray-800/30 rounded-2xl border border-gray-700/30 w-[600px] mx-auto shadow-2xl">
                  <Search className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Enter token address in the search bar above</h3>
                  <p className="text-base text-gray-400">Press <span className="text-blue-400 font-semibold">Analyze</span> button to start exploration</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

TokenTableSection.displayName = 'TokenTableSection';
