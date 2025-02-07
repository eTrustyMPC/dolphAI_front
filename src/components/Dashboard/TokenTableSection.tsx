import React, { useMemo } from 'react';
import { Search, X, ChevronLeft, ChevronRight, Star, BarChart2, Copy, Check, Shield, TrendingUp } from 'lucide-react';
import { AgentCard } from '@/components/Agent/AgentCard';
import { mockValueAgent, mockScoringAgents } from '@/services/mockAgentData';
import { Token } from '@/components/TokenPreview/types';
import { ConnectWalletPromo } from '@/components/ConnectWallet/ConnectWalletPromo';
import { NewsSection } from '../Agent/NewsSection';
import { OnChainUpdates } from '../Agent/OnChainUpdates';

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
  wallet,
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

  const renderTokenInfo = () => {
    if (!selectedToken) return null;
    
    return (
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-blue-500/20 rounded-xl backdrop-blur-sm overflow-hidden p-2.5">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            {selectedToken.icon && (
              <div className="relative">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center p-0.5">
                  <img 
                    src={selectedToken.icon} 
                    alt={selectedToken.name} 
                    className="w-full h-full rounded-lg object-cover" 
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center border-2 border-gray-900">
                  <Check className="w-2 h-2 text-white" />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 overflow-x-auto flex-1 min-w-0">
            <div className="flex flex-col min-w-[120px] justify-center py-1">
              <h3 className="text-sm font-semibold truncate flex items-center gap-2">
                {selectedToken.name}
                <span className="text-xs font-medium px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400">
                  {selectedToken.symbol}
                </span>
              </h3>
              <button 
                onClick={() => handleCopyAddress(selectedToken.address)}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                {copiedAddress === selectedToken.address ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                {selectedToken.address.slice(0, 6)}...{selectedToken.address.slice(-4)}
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="px-2.5 py-1.5 rounded-lg bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-blue-500/10 min-w-[85px]">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-purple-400"></div>
                  Price
                </span>
                <span className="text-sm font-semibold">
                  ${selectedToken.price || '1.25'}
                </span>
              </div>
              
              <div className="px-2.5 py-1.5 rounded-lg bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-blue-500/10 min-w-[85px]">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                  Market Cap
                </span>
                <span className="text-sm font-semibold">$300M</span>
              </div>
              
              <div className="px-2.5 py-1.5 rounded-lg bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-blue-500/10 min-w-[85px]">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-indigo-400"></div>
                  Volume
                </span>
                <span className="text-sm font-semibold">$15M</span>
              </div>
              
              <div className="px-2.5 py-1.5 rounded-lg bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-blue-500/10 min-w-[85px]">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                  Holders
                </span>
                <span className="text-sm font-semibold">120K</span>
              </div>
              
              <div className="px-2.5 py-1.5 rounded-lg bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-blue-500/10 min-w-[85px]">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-teal-400"></div>
                  Transactions
                </span>
                <span className="text-sm font-semibold">2.5K</span>
              </div>
              
              <div className="px-2.5 py-1.5 rounded-lg bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-blue-500/10 min-w-[85px]">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-sky-400"></div>
                  Liquidity
                </span>
                <span className="text-sm font-semibold">$150M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-8 h-full min-h-[32rem] mt-8">
      {/* Left Side - Leaderboard & News */}
      <div className="flex flex-col gap-4 w-[400px]">
        {/* Leaderboard */}
        <div className={`transition-all duration-300 ease-in-out bg-gray-900/40 border border-blue-500/30 rounded-2xl overflow-hidden flex-shrink-0 backdrop-blur-sm ${showLeaderboard ? 'h-[32rem]' : 'h-auto'}`}>
          <div className="flex flex-col h-full">
            <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800">
              <div className="p-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowLeaderboard(!showLeaderboard)}
                    className="group relative text-white/90 hover:text-white transition-all p-3 hover:bg-purple-500/10 rounded-xl flex-shrink-0 w-full flex items-center justify-center gap-2 border border-purple-500/20 hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] active:scale-[0.98]"  
                    title={showLeaderboard ? 'Show top 5' : 'View full leaderboard'}
                  >
                    <BarChart2 className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {showLeaderboard ? 'Show Top 5' : 'View All'}
                    </span>
                    {!showLeaderboard && (
                      <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </button>
                  {showLeaderboard && (
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="text"
                          value={leaderboardSearch}
                          onChange={(e) => setLeaderboardSearch(e.target.value)}
                          placeholder="Search tokens..."
                          className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        {leaderboardSearch && (
                          <button
                            onClick={() => setLeaderboardSearch('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600 min-h-0">
              <div>
                <div className="divide-y divide-gray-800">
                  {displayedTokens.map((token, index) => (
                  <div
                    key={token.address}
                    className="hover:bg-gray-800/50 transition-colors cursor-pointer relative overflow-hidden group"
                    onClick={(e) => {
                      if (e.target instanceof HTMLButtonElement && e.target.closest('[data-watchlist-button]')) {
                        return;
                      }
                      handleCopyAddress(token.address);
                    }}
                  >
                    <div className="py-2 px-3 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                            {index + 1}
                          </div>
                          {token.icon && (
                            <img 
                              src={token.icon} 
                              alt={token.name} 
                              className="w-4 h-4 rounded-full absolute -bottom-1 -right-1" 
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-medium truncate">{token.name}</h3>
                            <span className="text-sm text-gray-400">{token.symbol}</span>
                          </div>
                          <div className="flex items-center justify-between gap-2 mt-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-400">
                                {token.transactions ?? 0} transactions
                              </span>
                              <button
                                data-watchlist-button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleWatchlist(token.address);
                                }}
                                className={`p-1 rounded-md transition-colors ${watchlist.includes(token.address) ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-400 hover:text-gray-300'}`}
                                title={watchlist.includes(token.address) ? 'Remove from watchlist' : 'Add to watchlist'}
                              >
                                <Star className="w-4 h-4" fill={watchlist.includes(token.address) ? 'currentColor' : 'none'} />
                              </button>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyAddress(token.address);
                              }}
                              className="p-1 hover:bg-gray-700 rounded-md transition-colors"
                              title="Copy address"
                            >
                              {copiedAddress === token.address ? (
                                <Check className="w-3 h-3 text-green-500" />
                              ) : (
                                <Copy className="w-3 h-3 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div 
                      className={`absolute inset-0 opacity-10 bg-gradient-to-r ${getGradientClass(index)} group-hover:opacity-20 transition-opacity`}
                    />
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* News & Updates */}
        {searchQuery && selectedToken && (
          <div className="space-y-4">
            <NewsSection token={selectedToken} />
            <OnChainUpdates token={selectedToken} />
          </div>
        )}
      </div>

      {/* Right Side - Search, Token Info & Agents */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Search */}
        <div className="flex justify-center mt-[12px]">
          <div className="flex gap-2 w-[800px]">
          <div className="relative w-[650px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter token name or add"
              className="input w-full px-4 py-3 bg-gray-900/40 border border-gray-700/50 rounded-lg pl-10 pr-12"
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            {searchQuery && (
              <button
                onClick={handleSearchClear}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-purple-400" />
              </button>
            )}
          </div>
          <button
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              if (searchQuery && filteredTokens.length > 0) {
                setSelectedToken(filteredTokens[0]);
                handleAnalyzeToken(filteredTokens[0]);
              }
            }}
            disabled={!searchQuery || filteredTokens.length === 0}
          >
            <TrendingUp className="h-5 w-5" />
            Analyze token
          </button>
          </div>
        </div>

        {/* Token Info & Content */}
        {selectedToken && (
          <div className="mt-6">
            {renderTokenInfo()}
            
            {/* Main Content */}
            <div className="mt-6">
              {/* Agents */}
              <div className="flex-1">
                {searchQuery && selectedToken && (
                  <div className="bg-gray-900/40 border border-blue-500/30 rounded-2xl p-4 backdrop-blur-sm">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-purple-400" />
                      Agent for Value
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <AgentCard agent={mockValueAgent} />
                      <AgentCard agent={mockScoringAgents[0]} />
                    </div>
                  </div>
                )}

                {/* Connect Wallet Promo */}
                {selectedToken && !isWalletConnected && (
                  <ConnectWalletPromo
                    tokenName={selectedToken.name}
                    isWalletConnected={isWalletConnected}
                    onConnectSuccess={onConnectSuccess}
                    onConnectError={onConnectError}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

TokenTableSection.displayName = 'TokenTableSection';
