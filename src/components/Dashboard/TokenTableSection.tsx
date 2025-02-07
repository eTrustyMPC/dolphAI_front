import React, { useMemo } from 'react';
import { Shield, Search } from 'lucide-react';
import { DeFiGrid } from '@/components/Dashboard/DeFiGrid';
import { AgentCard } from '@/components/Agent/AgentCard';
import { mockValueAgent, mockScoringAgents } from '@/services/mockAgentData';
import { Token } from '@/components/TokenPreview/types';
import { ConnectWalletPromo } from '@/components/ConnectWallet/ConnectWalletPromo';
import { NewsSection } from '../Agent/NewsSection';
import { OnChainUpdates } from '../Agent/OnChainUpdates';
import { TokenInfo } from '../Token/TokenInfo';
import { TokenSearch } from '../Token/TokenSearch';
import { TokenLeaderboard } from '../Token/TokenLeaderboard';

interface Props {
  showLeaderboard: boolean;
  setShowLeaderboard: (show: boolean) => void;
  leaderboardSearch: string;
  setLeaderboardSearch: (search: string) => void;
  tokens: Token[];
  handleTokenSelect: (token: Token) => void;
  watchlist: string[];
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
  wallet: { isInitialized: boolean };
}

const defaultToken: Token = {
  name: 'Example Token',
  symbol: 'ETK',
  address: '0x1234...5678',
  price: '0.00',
  marketCapChange: '0%',
  volumeChange24h: '0%',
  holdersChange: '0%',
  transactions: 0,
  transactionsChange: '0%',
  liquidity: 0,
  liquidityChange: '0%',
  links: {
    website: undefined,
    twitter: undefined,
    discord: undefined,
    contract: undefined
  }
};

export const TokenTableSection: React.FC<Props> = ({
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
}) => {
  const sortedTokens = useMemo(
    () => tokens.sort((a, b) => (b.transactions ?? 0) - (a.transactions ?? 0)),
    [tokens]
  );

  const displayedTokens = useMemo(
    () => {
      const filtered = sortedTokens.filter(token => 
        token.name.toLowerCase().includes(leaderboardSearch.toLowerCase()) ||
        token.symbol.toLowerCase().includes(leaderboardSearch.toLowerCase())
      );
      return showLeaderboard ? filtered : filtered.slice(0, 5);
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

  return (
    <div className="flex gap-8 h-full min-h-[32rem] mt-8 relative">
      <div className="w-full h-full flex gap-8">
        {/* Left Side - Leaderboard & News */}
        <div className="flex flex-col gap-4 w-[400px]">
          {/* Leaderboard */}
          <TokenLeaderboard
            showLeaderboard={showLeaderboard}
            setShowLeaderboard={setShowLeaderboard}
            leaderboardSearch={leaderboardSearch}
            setLeaderboardSearch={setLeaderboardSearch}
            displayedTokens={displayedTokens}
            handleTokenSelect={handleTokenSelect}
            getGradientClass={getGradientClass}
            copiedAddress={copiedAddress}
            handleCopyAddress={handleCopyAddress}
            watchlist={watchlist}
            onToggleWatchlist={onToggleWatchlist}
          />

          {/* News & Updates */}
          <div className={`space-y-4 ${!searchQuery || !selectedToken ? 'blur-sm pointer-events-none' : ''}`}>
            <NewsSection token={selectedToken || defaultToken} />
            <OnChainUpdates token={selectedToken || defaultToken} />
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

          {/* Token Info & Content */}
          <div className="relative mt-4 space-y-4">
            <div className={`${!searchQuery || !selectedToken ? 'blur-sm pointer-events-none' : ''}`}>
              {/* Token Info */}
              <TokenInfo
                token={selectedToken || defaultToken}
                watchlist={watchlist}
                copiedAddress={copiedAddress}
                onToggleWatchlist={onToggleWatchlist}
                handleCopyAddress={handleCopyAddress}
                isWalletConnected={isWalletConnected}
              />

              {/* Agents */}
              <div className="mt-4">
              {/* Agents Section */}
              <div className="bg-gray-900/40 border border-blue-500/30 rounded-2xl p-4 backdrop-blur-sm mb-4">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  Agent for Value
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <AgentCard agent={mockValueAgent} />
                  <AgentCard agent={mockScoringAgents[0]} />
                </div>
              </div>

              {/* Connect Wallet Promo */}
              {selectedToken && !isWalletConnected && (
                <div className="mb-6">
                  <ConnectWalletPromo
                    tokenName={selectedToken.name}
                    isWalletConnected={isWalletConnected}
                    onConnectSuccess={onConnectSuccess}
                    onConnectError={onConnectError}
                  />
                </div>
              )}

              {/* DeFi Section */}
              <div className="relative mb-4">
                <div className={`bg-[#0B1018] border border-blue-500/30 rounded-2xl ${!isWalletConnected ? 'blur-sm opacity-50' : ''}`}>
                  <DeFiGrid isWalletConnected={isWalletConnected} />
                </div>
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
