import React, { useMemo, useEffect, useCallback } from 'react';
import { Search, X, ChevronRight, BarChart2, Copy, Check } from 'lucide-react';
import { TokenWatchlist } from './TokenWatchlist';
import { Token } from '@/components/TokenPreview/types';
import Image from 'next/image';

interface TokenLeaderboardProps {
  showLeaderboard: boolean;
  setShowLeaderboard: (show: boolean) => void;
  leaderboardSearch: string;
  setLeaderboardSearch: (search: string) => void;
  displayedTokens: Token[];
  handleTokenSelect: (token: Token) => void;
  getGradientClass: (index: number) => string;
  copiedAddress: string;
  handleCopyAddress: (address: string) => void;
  walletAddress: string;
  isWalletConnected: boolean;
  activeTab: 'leaderboard' | 'watchlist';
}

import { useWatchlist } from '@/hooks/useWatchlist';

const TokenIcon: React.FC<{ icon?: string }> = ({ icon }) => {
  const [error, setError] = React.useState(false);

  if (!icon || error) {
    return <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">TOKEN</div>;
  }

  // Check if the icon is a base64 string
  const isBase64 = icon.startsWith('data:');
  
  if (isBase64) {
    return (
      <img 
        src={icon} 
        alt="Token" 
        className="w-8 h-8 rounded-full object-cover"
        onError={() => setError(true)}
      />
    );
  }

  // For URL icons, use Next.js Image with error handling
  return (
    <Image
      src={icon}
      alt="Token"
      width={32}
      height={32}
      className="rounded-full object-cover"
      onError={() => setError(true)}
      unoptimized // Skip image optimization for external URLs
    />
  );
};

export const TokenLeaderboard: React.FC<TokenLeaderboardProps> = ({
  showLeaderboard,
  setShowLeaderboard,
  leaderboardSearch,
  setLeaderboardSearch,
  displayedTokens,
  handleTokenSelect,
  getGradientClass,
  copiedAddress,
  handleCopyAddress,
  walletAddress,
  isWalletConnected,
  activeTab,
}) => {
  console.log('TokenLeaderboard: Rendering with props', {
    walletAddress,
    isWalletConnected,
    activeTab,
    displayedTokensCount: displayedTokens.length
  });
  const { watchlist, loadWatchlist } = useWatchlist(isWalletConnected ? walletAddress : null);

  // Load watchlist on mount and wallet connection
  useEffect(() => {
    if (isWalletConnected && walletAddress) {
      console.log('Loading watchlist:', { activeTab, walletAddress });
      loadWatchlist();
    }
  }, [isWalletConnected, walletAddress]); // Don't depend on activeTab to avoid unnecessary reloads

  // Debug log current state
  useEffect(() => {
    console.log('TokenLeaderboard state:', {
      activeTab,
      isWalletConnected,
      walletAddress,
      watchlistLength: watchlist?.length,
      watchlistTokens: watchlist?.map(t => t.id)
    });
  }, [activeTab, isWalletConnected, walletAddress, watchlist]);

  // Token loading is now handled by the parent component
  
  // Helper function to check if a token is in watchlist
  const isTokenInWatchlist = useCallback((tokenId: string) => {
    return watchlist?.some(t => t.id === tokenId) ?? false;
  }, [watchlist]);

  const displayedTokensToShow = useMemo(() => {
    console.log('Filtering tokens:', { 
      displayedTokens: displayedTokens?.length || 0,
      watchlist: watchlist?.length || 0,
      activeTab,
      showLeaderboard
    });

    if (!displayedTokens?.length) {
      console.log('No tokens to display');
      return [];
    }

    // Keep all tokens in memory but filter display based on activeTab
    let filtered = displayedTokens;
    if (activeTab === 'watchlist' && isWalletConnected) {
      // Only show tokens that are in the watchlist
      filtered = displayedTokens.filter(token => isTokenInWatchlist(token.id));
      console.log('Filtered watchlist tokens:', filtered.length);
    }

    // Verify watchlist state for all displayed tokens
    filtered.forEach(token => {
      const inWatchlist = isTokenInWatchlist(token.id);
      console.log(`Token ${token.id} watchlist state:`, inWatchlist);
    });

    const result = showLeaderboard ? filtered : filtered.slice(0, 5);
    console.log('Final result:', result.length, 'tokens');
    return result;
  }, [displayedTokens, watchlist, activeTab, showLeaderboard, isWalletConnected, isTokenInWatchlist]);
  return (
    <div className="transition-all duration-300 ease-in-out border border-blue-500/30 overflow-hidden flex-shrink-0">
      <div className={`flex flex-col ${showLeaderboard ? 'h-[32rem]' : 'h-auto'}`}>

        <div className="sticky top-0 z-10 border-b border-gray-800 ">
          <div className="p-3">
            <div
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="group relative text-white/90 hover:text-white transition-all p-3 hover:bg-[#252A34] flex items-center justify-between w-full cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5" />
                <span className="text-xs font-medium">{showLeaderboard ? 'View Top 5' : 'View All'}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        <div className={`flex-1 overflow-y-auto ${showLeaderboard ? 'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-700' : ''}`}>
          <div className="space-y-2 p-3">
            {displayedTokensToShow.map((token, index) => (
              <div
                key={token.id}
                className="group relative w-full text-left cursor-pointer hover:bg-[#252A34] rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTokenSelect(token);
                }}
              >
                <div className="relative flex items-center gap-3 p-3 rounded-lg border border-gray-700/50 hover:border-purple-500/30 hover:bg-[#252A34]">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-400">
                      {index + 1}
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                      <TokenIcon icon={token.icon} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{token.name}</div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-gray-400">{token.queryCount ?? 0} queries</div>
                        {token.dynamics?.weeklyTxCount && (
                          <>
                            <div className="text-xs text-gray-400">{token.dynamics.weeklyTxCount} weekly txs</div>
                            {token.dynamics.weeklyTxCount > 2000 && (
                              <div className="text-[8px] text-amber-400 font-medium">
                                * graduate soon
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium text-white">{token.symbol}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        <span className="truncate max-w-[100px]">{token.id}</span>
                        {copiedAddress === token.id ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3 cursor-pointer hover:text-white" onClick={(e) => {
                            e.stopPropagation();
                            handleCopyAddress(token.id);
                          }} />
                        )}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg transition-colors">
                      {copiedAddress === token.address && (
                        <Check className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <TokenWatchlist
                      token={token}
                      walletAddress={walletAddress}
                      isWalletConnected={isWalletConnected}
                      activeTab={activeTab}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
